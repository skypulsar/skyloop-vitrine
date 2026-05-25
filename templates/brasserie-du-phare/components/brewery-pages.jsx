// brewery-pages.jsx — Pages + reusable components for Brasserie du Phare
const { useState, useEffect, useMemo, useRef, Fragment } = React;

// ─────────────────────────────────────────────────────────────────────────
// SVG primitives
// ─────────────────────────────────────────────────────────────────────────

function LighthouseMark({ size = 36, color = "currentColor" }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 60 84" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="56" height="80" rx="2" stroke={color} strokeWidth="2" fill="none"/>
      {/* rays */}
      <g fill={color} opacity="0.85">
        <polygon points="30,30 6,12 6,18"/>
        <polygon points="30,30 14,6 22,4"/>
        <polygon points="30,30 30,2 38,4"/>
        <polygon points="30,30 46,6 50,12"/>
        <polygon points="30,30 54,12 54,18"/>
      </g>
      {/* tower */}
      <rect x="26" y="30" width="8" height="36" fill={color}/>
      <rect x="24" y="62" width="12" height="4" fill={color}/>
      <circle cx="30" cy="26" r="5" fill={color}/>
      <rect x="28" y="22" width="4" height="4" fill={color}/>
      {/* waves base */}
      <path d="M 4 76 Q 15 70, 30 76 T 56 76 L 56 80 L 4 80 Z" fill={color} opacity="0.55"/>
    </svg>
  );
}

function WaveDivider({ flip = false, color = "var(--bp-ink)" }) {
  return (
    <svg className="bp-waves" preserveAspectRatio="none" viewBox="0 0 1440 60" style={{ transform: flip ? "scaleY(-1)" : "none" }}>
      <path d="M0,30 Q120,5 240,30 T480,30 T720,30 T960,30 T1200,30 T1440,30 L1440,60 L0,60 Z" fill={color}/>
    </svg>
  );
}

function Icon({ name, size = 18 }) {
  const props = { width: size, height: size, fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "cart": return <svg viewBox="0 0 24 24" {...props}><circle cx="9" cy="20" r="1.5"/><circle cx="17" cy="20" r="1.5"/><path d="M2 3h3l3 13h11l2-9H7"/></svg>;
    case "menu": return <svg viewBox="0 0 24 24" {...props}><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></svg>;
    case "close": return <svg viewBox="0 0 24 24" {...props}><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>;
    case "arrow-right": return <svg viewBox="0 0 24 24" {...props}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="13 6 19 12 13 18"/></svg>;
    case "arrow-left": return <svg viewBox="0 0 24 24" {...props}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="11 6 5 12 11 18"/></svg>;
    case "pin": return <svg viewBox="0 0 24 24" {...props}><path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z"/><circle cx="12" cy="9" r="2.5"/></svg>;
    case "phone": return <svg viewBox="0 0 24 24" {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.11L8.1 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.84.57 2.8.7A2 2 0 0 1 22 16.92z"/></svg>;
    case "mail": return <svg viewBox="0 0 24 24" {...props}><rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="3 7 12 13 21 7"/></svg>;
    case "clock": return <svg viewBox="0 0 24 24" {...props}><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>;
    case "check": return <svg viewBox="0 0 24 24" {...props}><polyline points="5 12 10 17 19 7"/></svg>;
    case "wave": return <svg viewBox="0 0 24 24" {...props}><path d="M2 12 Q 6 8, 10 12 T 18 12 T 24 12" /></svg>;
    case "instagram": return <svg viewBox="0 0 24 24" {...props}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/></svg>;
    case "facebook": return <svg viewBox="0 0 24 24" {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
    default: return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────
// Layout shell — Nav + Footer
// ─────────────────────────────────────────────────────────────────────────

function Nav({ page, go, cartCount, openCart, mode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    ["accueil", "Accueil"],
    ["bieres", "Nos bières"],
    ["histoire", "Histoire"],
    ["evenements", "Visites & événements"],
    ["ou-trouver", "Où nous trouver"],
    ["contact", "Contact"],
  ];

  return (
    <nav className="bp-nav">
      <div className="bp-nav-row">
        <a className="bp-nav-brand" onClick={() => { go("accueil"); setMenuOpen(false); }}>
          <img src="assets/logo.jpeg" alt="" />
          <div>
            <div className="bp-nav-name">Brasserie du Phare</div>
            <div className="bp-nav-tag">Brassée en bord de mer</div>
          </div>
        </a>
        <div className="bp-nav-links">
          {links.map(([k, label]) => (
            <a key={k} className={page === k ? "active" : ""} onClick={() => go(k)}>{label}</a>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button className="bp-cart-btn" onClick={openCart}>
            <Icon name="cart" size={16} />
            <span>Panier</span>
            {cartCount > 0 && <span className="bp-cart-count">{cartCount}</span>}
          </button>
          <button className="bp-nav-burger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            <Icon name={menuOpen ? "close" : "menu"} size={22} />
          </button>
        </div>
      </div>
      {menuOpen && mode === "mobile" && (
        <div className="bp-mobile-menu">
          {links.map(([k, label]) => (
            <a key={k} className={page === k ? "active" : ""} onClick={() => { go(k); setMenuOpen(false); }}>{label}</a>
          ))}
        </div>
      )}
    </nav>
  );
}

function Footer({ go }) {
  return (
      <footer className="bp-footer">
        <div className="bp-footer-inner">
          <div className="bp-footer-brand">
            <img src="assets/logo.jpeg" alt="Logo Brasserie du Phare" />
            <div>
              <h4>Brasserie du Phare</h4>
              <p>Bières artisanales brassées à Cany-Barville, sur la Côte d'Albâtre.</p>
            </div>
          </div>
          <div>
            <h6>Naviguer</h6>
            <a onClick={() => go("accueil")}>Accueil</a>
            <a onClick={() => go("bieres")}>Nos bières</a>
            <a onClick={() => go("histoire")}>Notre histoire</a>
            <a onClick={() => go("evenements")}>Événements</a>
            <a onClick={() => go("ou-trouver")}>Où nous trouver</a>
          </div>
          <div>
            <h6>Brasserie</h6>
            <a>18 bis Route de Fécamp</a>
            <a>76450 Cany-Barville</a>
            <a>06 52 96 61 21</a>
            <a>labrasserieduphare@gmail.com</a>
          </div>
          <div>
            <h6>Suivez le phare</h6>
            <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
              <a style={{ display: "inline-flex", padding: 8, border: "1px solid rgba(251,244,223,0.18)", borderRadius: 999 }}><Icon name="instagram" size={18} /></a>
              <a style={{ display: "inline-flex", padding: 8, border: "1px solid rgba(251,244,223,0.18)", borderRadius: 999 }}><Icon name="facebook" size={18} /></a>
            </div>
            <p style={{ fontSize: 12, marginTop: 16, opacity: 0.7 }}>L'abus d'alcool est dangereux pour la santé, à consommer avec modération.</p>
          </div>
        </div>
        <div className="bp-footer-bottom">
          <span>© 2026 Brasserie du Phare</span>
          <span>Brassée en bord de mer · Normandie</span>
        </div>
      </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// HOME PAGE
// ─────────────────────────────────────────────────────────────────────────

function HomePage({ go, addToCart }) {
  const featured = BEERS[0]; // Albâtre Pale Ale
  return (
    <div>
      {/* HERO */}
      <section className="bp-hero">
        <div className="bp-hero-inner">
          <div className="bp-hero-copy">
            <span className="bp-rule">Brassée à Cany-Barville · Normandie</span>
            <h1>
              Les bières<br/>
              <em>brassées</em> en<br/>
              bord de mer.
            </h1>
            <p className="lede">
              Une microbrasserie familiale posée à dix kilomètres des falaises de la Côte d'Albâtre. Sept bières, deux brasseurs, une eau de Normandie.
            </p>
            <div className="bp-hero-actions">
              <button className="bp-btn lg" onClick={() => go("bieres")}>
                Découvrir la gamme <Icon name="arrow-right" size={16} />
              </button>
              <button className="bp-btn ghost lg" onClick={() => go("histoire")}>
                Notre histoire
              </button>
            </div>
          </div>
          <div className="bp-hero-visual">
            <img src="assets/photos/bottles-three.jpeg" alt="Bouteilles de la Brasserie du Phare" />
            <div className="bp-hero-stamp">
              <span>Depuis</span>
              <strong>2019</strong>
              <span>Cany-Barville</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="bp-section">
        <div className="bp-section-head">
          <div>
            <span className="bp-eyebrow">La signature</span>
            <h2>L'Albâtre, notre Pale&nbsp;Ale fondatrice.</h2>
          </div>
          <p className="lede">La première bière brassée à la Brasserie, et toujours notre plus servie. Blonde, peu amère, façonnée par les houblons français.</p>
        </div>
        <div className="bp-featured">
          <div className="bp-featured-img">
            <img src={featured.formats[1].img} alt="" />
          </div>
          <div>
            <span className="bp-eyebrow" style={{ color: featured.color }}>{featured.style} · {featured.abv}</span>
            <h3>{featured.name}</h3>
            <p className="desc">{featured.desc}</p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button className="bp-btn" onClick={() => go({ name: "beer", slug: featured.slug })}>Voir la fiche</button>
              <button className="bp-btn ghost" onClick={() => addToCart(featured, featured.formats[0])}>
                Ajouter au panier — {featured.formats[0].price.toFixed(2)} €
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* GAMME GRID */}
      <section className="bp-section" style={{ paddingTop: 32 }}>
        <div className="bp-section-head">
          <div>
            <span className="bp-eyebrow">La gamme complète</span>
            <h2>Sept bières, sept tempéraments.</h2>
          </div>
          <p className="lede">Les quatre Albâtre permanentes, les sours saisonniers, et notre Soif estivale.</p>
        </div>
        <BeerGrid go={go} />
      </section>

      {/* STORY */}
      <section className="bp-story">
        <div className="bp-story-inner">
          <div className="bp-story-img">
            <img src="assets/photos/brewers.jpeg" alt="Les brasseurs de la Brasserie du Phare" />
          </div>
          <div>
            <span className="bp-eyebrow">Notre histoire</span>
            <h2>Une brasserie, deux mains, une côte.</h2>
            <p>
              On a posé nos premières cuves dans un hangar du bord de mer en 2019. Depuis, on brasse à deux, avec l'eau de Normandie, des malts français et des houblons choisis un à un.
            </p>
            <p>
              Pas de filtration, pas de pasteurisation. Juste le temps, le grain, et la mer pas très loin.
            </p>
            <button className="bp-btn" style={{ background: "var(--bp-teal-bright)", marginTop: 16 }} onClick={() => go("histoire")}>
              Rencontrer les brasseurs <Icon name="arrow-right" size={16} />
            </button>
            <div className="bp-story-stats">
              <div className="stat"><strong>7</strong><span>Bières</span></div>
              <div className="stat"><strong>2019</strong><span>Première cuvée</span></div>
              <div className="stat"><strong>100%</strong><span>Normandie</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS PREVIEW */}
      <section className="bp-section">
        <div className="bp-section-head">
          <div>
            <span className="bp-eyebrow">Agenda</span>
            <h2>Venez nous voir.</h2>
          </div>
          <p className="lede">Visites, apéros, ateliers brassage. La brasserie ouvre ses portes plusieurs fois par mois.</p>
        </div>
        <div className="bp-events">
          {EVENTS.slice(0, 3).map((e, i) => (
            <article key={i} className="bp-event">
              <div className="bp-event-date">
                <div className="d">{e.dayMonth.day}</div>
                <span className="m">{e.dayMonth.month}</span>
              </div>
              <div className="bp-event-body">
                <span className="meta">{e.price}</span>
                <h4>{e.title}</h4>
                <p>{e.desc}</p>
                <p style={{ marginTop: 10, color: "var(--bp-teal)", fontFamily: "var(--bp-font-label)", letterSpacing: ".12em", textTransform: "uppercase", fontSize: 11 }}>
                  {e.place}
                </p>
              </div>
            </article>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 36 }}>
          <button className="bp-btn ghost" onClick={() => go("evenements")}>Voir tout l'agenda</button>
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// BEER GRID (used in home + bieres page)
// ─────────────────────────────────────────────────────────────────────────

function BeerGrid({ go, filter = "all" }) {
  const list = useMemo(() => {
    if (filter === "permanente") return BEERS.filter(b => !b.slug.includes("sour"));
    if (filter === "sour") return BEERS.filter(b => b.slug.includes("sour"));
    return BEERS;
  }, [filter]);

  return (
    <div className="bp-beer-grid">
      {list.map(b => (
        <article key={b.slug} className="bp-beer-card" onClick={() => go({ name: "beer", slug: b.slug })} style={{ borderTop: `4px solid ${b.color}` }}>
          <div className="bp-beer-card-img" style={{ background: b.colorSoft }}>
            <img src={b.img} alt={b.name} />
            <span className="abv-pill" style={{ color: b.colorDark, borderLeft: `3px solid ${b.color}`, paddingLeft: 8 }}>ALC&nbsp;{b.abv}</span>
          </div>
          <div className="bp-beer-card-body">
            <span className="style">{b.style}</span>
            <h3>{b.name}</h3>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--bp-ink-soft)" }}>{b.short}</p>
            <div className="price-row">
              <span className="price">{b.formats[0].price.toFixed(2)} €</span>
              <small>33 cl · {b.formats.length > 1 ? "Packs dispo." : "À l'unité"}</small>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// BIÈRES PAGE
// ─────────────────────────────────────────────────────────────────────────

function BeersPage({ go }) {
  const [filter, setFilter] = useState("all");
  const filters = [
    ["all", "Toute la gamme"],
    ["permanente", "Les Albâtre"],
    ["sour", "Les Sours"],
  ];
  return (
    <div>
      <section className="bp-section" style={{ paddingTop: 64 }}>
        <div className="bp-section-head">
          <div>
            <span className="bp-eyebrow">Notre cave</span>
            <h2>Sept bières, brassées à dix kilomètres de la mer.</h2>
          </div>
          <p className="lede">
            Chaque recette est inspirée d'un terroir, d'une saison, ou d'un voyage. Toutes sont non&nbsp;filtrées et non&nbsp;pasteurisées — le grain reste vivant dans la bouteille.
          </p>
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
          {filters.map(([k, label]) => (
            <button key={k}
              className={"bp-btn " + (filter === k ? "" : "ghost")}
              style={{ padding: "10px 18px", fontSize: 11 }}
              onClick={() => setFilter(k)}>
              {label}
            </button>
          ))}
        </div>
        <BeerGrid go={go} filter={filter} />
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// BEER DETAIL
// ─────────────────────────────────────────────────────────────────────────

function BeerDetailPage({ slug, go, addToCart }) {
  const beer = useMemo(() => BEERS.find(b => b.slug === slug) || BEERS[0], [slug]);
  const [fmtIdx, setFmtIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => { setFmtIdx(0); setQty(1); setAdded(false); }, [slug]);

  const format = beer.formats[fmtIdx];

  function handleAdd() {
    for (let i = 0; i < qty; i++) addToCart(beer, format);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <section className="bp-detail">
      <div className="bp-breadcrumb">
        <a onClick={() => go("accueil")}>Accueil</a>
        <span>·</span>
        <a onClick={() => go("bieres")}>Bières</a>
        <span>·</span>
        <span style={{ color: "var(--bp-ink)" }}>{beer.name}</span>
      </div>
      <div className="bp-detail-grid">
        <div className="bp-detail-img-wrap" style={{ background: beer.colorSoft }}>
          <img src={format.img} alt={beer.name} />
        </div>
        <div>
          <span className="bp-eyebrow" style={{ color: beer.colorDark }}>{beer.style}</span>
          <h1>{beer.name}</h1>
          <div style={{ marginBottom: 12 }}>
            <span className="style-pill">ALC {beer.abv}</span>
            <span className="style-pill">33 cl</span>
            <span className="style-pill">Non filtrée</span>
          </div>
          <p className="bp-detail-desc">{beer.desc}</p>

          <div className="bp-format-picker">
            {beer.formats.map((f, i) => (
              <div key={i} className={"bp-format" + (fmtIdx === i ? " selected" : "")} onClick={() => setFmtIdx(i)}>
                <div>
                  <div className="label">{f.size}</div>
                  <small style={{ color: "var(--bp-ink-soft)", fontSize: 12 }}>
                    {f.size.startsWith("Pack de 6") ? "Carton 6 × 33 cl" : f.size.startsWith("Pack de 3") ? "3 bouteilles 33 cl" : "Bouteille 33 cl"}
                  </small>
                </div>
                <div className="price">{f.price.toFixed(2)} €</div>
              </div>
            ))}
          </div>

          <div className="bp-detail-cta">
            <div className="bp-qty">
              <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(q => q + 1)}>+</button>
            </div>
            <button className="bp-btn lg" style={{ background: beer.colorDark, flex: 1 }} onClick={handleAdd}>
              {added ? (<><Icon name="check" size={16} /> Ajouté au panier</>) : (<>Ajouter au panier · {(format.price * qty).toFixed(2)}&nbsp;€</>)}
            </button>
          </div>

          <dl className="bp-detail-info">
            <div><dt>Dégustation</dt><dd>{beer.serve} · accompagne {beer.pairings.join(", ").toLowerCase()}.</dd></div>
            <div><dt>Ingrédients</dt><dd>{beer.ingredients}</dd></div>
            <div><dt>À conserver</dt><dd>Debout, à l'abri de la lumière. À consommer de préférence dans les 12 mois.</dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// HISTOIRE PAGE
// ─────────────────────────────────────────────────────────────────────────

function HistoirePage({ go }) {
  return (
    <div>
      <section className="bp-about-hero">
        <span className="bp-rule">Notre histoire</span>
        <h1>Du grain, de l'eau,<br/>et la mer pas très loin.</h1>
        <p className="lede">
          La Brasserie du Phare est née en 2019 à Cany-Barville, à mi-chemin entre les falaises d'Étretat et celles de Veulettes-sur-Mer.
          Le projet d'une famille de Cauchois qui voulait brasser à la maison ce qu'elle ne trouvait pas en magasin.
        </p>
      </section>

      <div className="bp-about-grid">
        <div>
          <span className="bp-eyebrow">2019 — le hangar</span>
          <h3>Premiers brassins dans un hangar de bord de mer.</h3>
          <p>
            On a démarré avec une cuve de 100 litres, dans un hangar prêté par un voisin agriculteur. Pendant trois ans, on a brassé le soir et le week-end. Notre première Albâtre Pale Ale est sortie à l'été 2019, vendue de la main à la main aux voisins, aux cafés du coin, puis aux festivals locaux.
          </p>
        </div>
        <img src="assets/photos/bottles-trio.webp" alt="" />
      </div>

      <div className="bp-about-grid flip">
        <div>
          <span className="bp-eyebrow">2022 — la brasserie</span>
          <h3>L'installation à Cany-Barville, avec des cuves de 600 litres.</h3>
          <p>
            En 2022, on a investi dans une vraie brasserie, route de Fécamp. Quatre cuves de 600 litres, une salle de dégustation, une terrasse l'été. La gamme s'est étoffée : Red Albâtre, puis Double Albâtre, Soif, et enfin les Sours fruités qu'on aime tant.
          </p>
        </div>
        <img src="assets/photos/bottles-75cl.webp" alt="" />
      </div>

      <div className="bp-about-grid">
        <div>
          <span className="bp-eyebrow">Notre méthode</span>
          <h3>Non filtrées. Non pasteurisées. Brassées entièrement à la main.</h3>
          <p>
            On utilise de l'eau de Normandie, des malts français, et on choisit nos houblons un à un — souvent en France, parfois en Belgique, parfois plus loin pour les variétés qui apportent ce qu'on cherche. Pas de raccourci industriel : on laisse la levure faire son travail jusqu'au bout.
          </p>
        </div>
        <img src="assets/photos/bottles-three.jpeg" alt="" />
      </div>

      <section style={{ background: "var(--bp-paper-deep)", padding: "80px 32px 32px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <span className="bp-eyebrow">L'équipe</span>
          <h2 className="bp-display" style={{ fontSize: "clamp(36px, 5vw, 56px)", marginTop: 12 }}>Les visages derrière les cuves.</h2>
        </div>
      </section>
      <div className="bp-brewers" style={{ background: "var(--bp-paper-deep)", padding: "32px 32px 96px", maxWidth: "100%" }}>
        <div className="bp-brewer">
          <img src="assets/photos/brewers.jpeg" alt="" style={{ objectPosition: "20% center" }} />
          <h4>Jean-Marc</h4>
          <div className="role">Maître brasseur · co-fondateur</div>
          <p>Ancien ingénieur agronome reconverti par passion du grain. Veille sur les recettes et les fermentations longues.</p>
        </div>
        <div className="bp-brewer">
          <img src="assets/photos/brewers.jpeg" alt="" style={{ objectPosition: "75% center" }} />
          <h4>Sarah Morand</h4>
          <div className="role">Brasseuse · responsable cave</div>
          <p>S'occupe des sours et des bières fruitées. Va chercher les fruits chez les producteurs du Pays de Caux à chaque saison.</p>
        </div>
        <div className="bp-brewer">
          <img src="assets/photos/session-ipa.jpg" alt="" />
          <h4>Léa</h4>
          <div className="role">Bières collaboratives · événements</div>
          <p>Coordonne les brassins collaboratifs (Pink Boots) et accueille les visiteurs du jeudi au samedi.</p>
        </div>
      </div>

      <section className="bp-story">
        <div className="bp-story-inner" style={{ gridTemplateColumns: "1fr" }}>
          <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
            <span className="bp-eyebrow">Engagement</span>
            <h2 style={{ marginTop: 16 }}>Tout vient d'ici, ou de pas loin.</h2>
            <p style={{ fontSize: 19 }}>
              Eau de Normandie. Malts français de la coopérative Cauchoise. Fruits des vergers du Pays de Caux pour nos sours. Bouteilles consignées dans un rayon de 30 km. Le local n'est pas un argument marketing, c'est juste notre quotidien.
            </p>
            <button className="bp-btn" style={{ background: "var(--bp-teal-bright)", marginTop: 24 }} onClick={() => go("bieres")}>
              Découvrir les bières <Icon name="arrow-right" size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { LighthouseMark, WaveDivider, Icon, Nav, Footer, HomePage, BeersPage, BeerDetailPage, BeerGrid, HistoirePage });
