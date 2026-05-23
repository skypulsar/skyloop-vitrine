// brewery-app.jsx — Main BrewerySite component with routing + cart state

function BrewerySite({ mode = "desktop" }) {
  // route = { name: 'accueil' | 'bieres' | 'beer' | ... , slug?: string }
  const [route, setRoute] = React.useState({ name: "accueil" });
  const [cart, setCart] = React.useState([]);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [order, setOrder] = React.useState(null);
  const scrollRef = React.useRef(null);

  function go(r) {
    const next = typeof r === "string" ? { name: r } : r;
    setRoute(next);
    setCartOpen(false);
    // scroll the site container to top
    requestAnimationFrame(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    });
  }

  function addToCart(beer, format) {
    setCart(prev => {
      const key = `${beer.slug}|${format.size}`;
      const idx = prev.findIndex(it => it.key === key);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return next;
      }
      return [...prev, {
        key,
        slug: beer.slug,
        name: beer.name,
        format: format.size,
        price: format.price,
        img: format.img,
        qty: 1,
      }];
    });
  }
  function removeFromCart(i) { setCart(prev => prev.filter((_, idx) => idx !== i)); }
  function updateQty(i, qty) { setCart(prev => prev.map((it, idx) => idx === i ? { ...it, qty } : it)); }

  const cartCount = cart.reduce((s, it) => s + it.qty, 0);

  function renderPage() {
    switch (route.name) {
      case "accueil":     return <HomePage go={go} addToCart={addToCart} />;
      case "bieres":      return <BeersPage go={go} />;
      case "beer":        return <BeerDetailPage slug={route.slug} go={go} addToCart={addToCart} />;
      case "histoire":    return <HistoirePage go={go} />;
      case "evenements":  return <EventsPage go={go} />;
      case "ou-trouver":  return <OuTrouverPage go={go} />;
      case "contact":     return <ContactPage />;
      case "checkout":    return <CheckoutPage cart={cart} go={(r) => { if (r === "confirmed") {} else go(r); }} onConfirm={(o) => { setOrder(o); setCart([]); go("confirmation"); }} />;
      case "confirmation": return <ConfirmPage order={order} go={go} />;
      default: return <HomePage go={go} addToCart={addToCart} />;
    }
  }

  return (
    <div className="bp-site" data-mode={mode}
         style={{ height: "100%", position: "relative", overflow: "hidden" }}>
      <div className="bp-scroll" ref={scrollRef}
           style={{ height: "100%", overflowY: "auto", overflowX: "hidden" }}>
        <Nav page={route.name} go={go} cartCount={cartCount} openCart={() => setCartOpen(true)} mode={mode} />
        {renderPage()}
        <Footer go={go} />
      </div>
      {cartOpen && (
        <CartSheet
          cart={cart}
          removeFromCart={removeFromCart}
          updateQty={updateQty}
          close={() => setCartOpen(false)}
          go={go}
        />
      )}
    </div>
  );
}

window.BrewerySite = BrewerySite;
