// brewery-shop.jsx — Events, OuTrouver, Contact, Cart, Checkout, Confirmation
const { useState: useState2, useEffect: useEffect2, useMemo: useMemo2, Fragment: Fragment2 } = React;

// ─────────────────────────────────────────────────────────────────────────
// EVENTS PAGE
// ─────────────────────────────────────────────────────────────────────────

function EventsPage({ go }) {
  return (
    <div>
      <section className="bp-about-hero">
        <span className="bp-rule">Agenda</span>
        <h1>Visites, dégustations,<br/>apéros sur la terrasse.</h1>
        <p className="lede">
          La brasserie ouvre ses portes plusieurs fois par mois. Visites guidées, soirées thématiques autour d'une cuvée, ateliers brassage amateur — toutes les occasions sont bonnes pour pousser la porte du hangar.
        </p>
      </section>

      <section className="bp-section">
        <div className="bp-events">
          {EVENTS.map((e, i) => (
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
                <button className="bp-btn ghost" style={{ marginTop: 16, padding: "8px 16px", fontSize: 11 }}>
                  Réserver une place
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bp-story" style={{ marginTop: 0 }}>
        <div className="bp-story-inner" style={{ gridTemplateColumns: "1fr" }}>
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
            <span className="bp-eyebrow">Privatisation</span>
            <h2 style={{ marginTop: 16 }}>Vous organisez un événement&nbsp;?</h2>
            <p style={{ fontSize: 18 }}>
              On peut privatiser la brasserie pour un anniversaire, un EVG/EVJF, un séminaire d'entreprise ou un mariage. Capacité de 40 personnes assises, 80 debout, terrasse comprise.
            </p>
            <button className="bp-btn" style={{ background: "var(--bp-teal-bright)", marginTop: 20 }} onClick={() => go("contact")}>
              Nous contacter <Icon name="arrow-right" size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// OÙ NOUS TROUVER
// ─────────────────────────────────────────────────────────────────────────

function OuTrouverPage({ go }) {
  return (
    <div>
      <section className="bp-about-hero">
        <span className="bp-rule">Revendeurs · Bars partenaires</span>
        <h1>Où boire une<br/>Brasserie du Phare.</h1>
        <p className="lede">
          Nos bières sont disponibles à la brasserie, chez nos revendeurs partenaires, et à la carte d'une trentaine de bars et restaurants en Normandie.
        </p>
      </section>

      <section className="bp-section" style={{ paddingTop: 0 }}>
        <div className="bp-section-head">
          <div>
            <span className="bp-eyebrow">Trente points de vente en Normandie</span>
            <h2>Caves, épiceries fines, restaurants&nbsp;…</h2>
          </div>
          <p className="lede">Et bien sûr en direct à la brasserie, sans intermédiaire et au meilleur prix.</p>
        </div>
        <div className="bp-resellers">
          {RESELLERS.map((r, i) => (
            <div key={i} className="bp-reseller">
              <div className="kind">{r.kind}</div>
              <h5>{r.name}</h5>
              <div className="city"><Icon name="pin" size={14} />{r.city}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bp-story" style={{ paddingTop: 48, paddingBottom: 48 }}>
        <div className="bp-story-inner" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <div>
            <span className="bp-eyebrow">À la brasserie</span>
            <h2 style={{ marginTop: 12, fontSize: 44 }}>Le mieux,<br/>c'est encore<br/>de venir.</h2>
            <p>Le jeudi et vendredi soir de 17h à 22h, le samedi matin et soir. On vous fait visiter, on vous fait goûter, et vous repartez avec votre carton.</p>
            <button className="bp-btn" style={{ background: "var(--bp-teal-bright)", marginTop: 16 }} onClick={() => go("contact")}>
              Voir l'adresse et les horaires <Icon name="arrow-right" size={16} />
            </button>
          </div>
          <div style={{ background: "rgba(251,244,223,0.08)", padding: 32, borderRadius: 6, border: "1px solid rgba(251,244,223,0.15)" }}>
            <span className="bp-eyebrow">Vous êtes un professionnel&nbsp;?</span>
            <h3 style={{ fontFamily: "var(--bp-font-display)", fontSize: 28, margin: "12px 0", color: "var(--bp-cream)" }}>
              Devenir revendeur
            </h3>
            <p>On livre la Normandie en direct. Conditions sur volume, tarifs CHR, fûts 20L et 30L disponibles.</p>
            <p style={{ marginTop: 12 }}>
              <strong style={{ color: "var(--bp-cream)" }}>labrasserieduphare@gmail.com</strong><br/>
              <strong style={{ color: "var(--bp-cream)" }}>06 52 96 61 21</strong>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// CONTACT
// ─────────────────────────────────────────────────────────────────────────

function ContactPage() {
  const [sent, setSent] = useState2(false);
  return (
    <div>
      <section className="bp-about-hero" style={{ paddingBottom: 32 }}>
        <span className="bp-rule">Contact</span>
        <h1>Venez pousser<br/>la porte du hangar.</h1>
      </section>

      <div className="bp-contact-grid">
        <div>
          <div className="bp-map">
            <iframe
              title="Carte — Brasserie du Phare, Cany-Barville"
              src="https://www.google.com/maps?q=18+bis+Route+de+F%C3%A9camp,+76450+Cany-Barville&output=embed"
              width="100%" height="100%"
              style={{ border: 0, display: "block" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen>
            </iframe>
          </div>
        </div>

        <div>
          <div className="bp-info-list">
            <div className="row">
              <div className="icon"><Icon name="pin" size={20} /></div>
              <div>
                <h5>Adresse</h5>
                <p>18 bis Route de Fécamp<br/>76450 Cany-Barville · Normandie</p>
              </div>
            </div>
            <div className="row">
              <div className="icon"><Icon name="phone" size={20} /></div>
              <div>
                <h5>Téléphone</h5>
                <p><a href="tel:0652966121" style={{ color: "var(--bp-teal)", textDecoration: "none", fontWeight: 500 }}>06 52 96 61 21</a></p>
              </div>
            </div>
            <div className="row">
              <div className="icon"><Icon name="mail" size={20} /></div>
              <div>
                <h5>E-mail</h5>
                <p><a href="mailto:labrasserieduphare@gmail.com" style={{ color: "var(--bp-teal)", textDecoration: "none", fontWeight: 500 }}>labrasserieduphare@gmail.com</a></p>
              </div>
            </div>
            <div className="row">
              <div className="icon"><Icon name="clock" size={20} /></div>
              <div style={{ flex: 1 }}>
                <h5>Horaires d'ouverture</h5>
                <div className="bp-hours" style={{ marginTop: 8 }}>
                  {BREWERY.hours.map((h, i) => (
                    <div key={i} className={"h-row" + (h.h === "Fermé" ? " closed" : "")}>
                      <span className="day">{h.day}</span>
                      <span>{h.h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 40, padding: 28, background: "var(--bp-cream)", border: "1px solid var(--bp-rule)", borderRadius: 6 }}>
            <h3 style={{ fontFamily: "var(--bp-font-display)", fontSize: 28, margin: "0 0 16px" }}>Une question, un message&nbsp;?</h3>
            {sent ? (
              <div style={{ textAlign: "center", padding: "24px 12px" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--bp-teal)", color: "var(--bp-cream)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  <Icon name="check" size={28} />
                </div>
                <p style={{ fontFamily: "var(--bp-font-display)", fontSize: 22, color: "var(--bp-ink)" }}>Message envoyé&nbsp;!</p>
                <p style={{ color: "var(--bp-ink-soft)", fontSize: 14 }}>On vous recontacte sous 48h.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                <div className="bp-row">
                  <div className="bp-field"><label>Nom</label><input type="text" required placeholder="Votre nom" /></div>
                  <div className="bp-field"><label>E-mail</label><input type="email" required placeholder="vous@exemple.fr" /></div>
                </div>
                <div className="bp-field"><label>Sujet</label>
                  <select defaultValue="">
                    <option value="" disabled>Choisir un sujet</option>
                    <option>Question sur les bières</option>
                    <option>Visite / dégustation</option>
                    <option>Privatisation</option>
                    <option>Revente / professionnels</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div className="bp-field"><label>Message</label><textarea rows="4" required placeholder="Votre message…"></textarea></div>
                <button type="submit" className="bp-btn block">Envoyer le message</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// CART DRAWER
// ─────────────────────────────────────────────────────────────────────────

function CartSheet({ cart, removeFromCart, updateQty, close, go }) {
  const total = cart.reduce((s, it) => s + it.price * it.qty, 0);
  return (
    <div className="bp-overlay" onClick={close}>
      <div className="bp-cart-sheet" onClick={e => e.stopPropagation()}>
        <div className="bp-cart-head">
          <h3>Votre panier {cart.length > 0 && <span style={{ fontSize: 16, color: "var(--bp-ink-soft)" }}>· {cart.reduce((s, it) => s + it.qty, 0)} article{cart.reduce((s, it) => s + it.qty, 0) > 1 ? "s" : ""}</span>}</h3>
          <button className="bp-cart-close" onClick={close}><Icon name="close" size={20}/></button>
        </div>
        <div className="bp-cart-list">
          {cart.length === 0 ? (
            <div className="bp-cart-empty">
              <LighthouseMark size={56} color="var(--bp-teal-soft)" />
              <h4>Le panier est vide.</h4>
              <p>Direction la cave pour le remplir.</p>
              <button className="bp-btn ghost" style={{ marginTop: 20 }} onClick={() => { close(); go("bieres"); }}>
                Voir les bières
              </button>
            </div>
          ) : cart.map((it, i) => (
            <div key={i} className="bp-cart-item">
              <img src={it.img} alt="" />
              <div>
                <h5>{it.name}</h5>
                <div className="fmt">{it.format}</div>
                <div className="row">
                  <div className="bp-qty" style={{ transform: "scale(0.85)", transformOrigin: "left center" }}>
                    <button onClick={() => updateQty(i, Math.max(1, it.qty - 1))}>−</button>
                    <span>{it.qty}</span>
                    <button onClick={() => updateQty(i, it.qty + 1)}>+</button>
                  </div>
                  <span className="price">{(it.price * it.qty).toFixed(2)} €</span>
                </div>
              </div>
              <button className="del" onClick={() => removeFromCart(i)}>Retirer</button>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div className="bp-cart-foot">
            <div className="total">
              <span style={{ fontFamily: "var(--bp-font-label)", letterSpacing: ".14em", textTransform: "uppercase", fontSize: 12, color: "var(--bp-ink-soft)" }}>Sous-total</span>
              <b>{total.toFixed(2)} €</b>
            </div>
            <button className="bp-btn block lg" onClick={() => { close(); go("checkout"); }}>
              Passer la commande <Icon name="arrow-right" size={14} />
            </button>
            <small>Livraison ou retrait sur place · paiement à l'étape suivante</small>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// CHECKOUT
// ─────────────────────────────────────────────────────────────────────────

function CheckoutPage({ cart, go, onConfirm }) {
  const [method, setMethod] = useState2("livraison");
  const [form, setForm] = useState2({
    prenom: "", nom: "", email: "", phone: "",
    adresse: "", cp: "", ville: "",
    pickupDate: "Samedi 30 mai · 10h–12h",
    paiement: "cb",
    cb: "", expiry: "", cvc: "",
    notes: "",
  });

  const subtotal = useMemo2(() => cart.reduce((s, it) => s + it.price * it.qty, 0), [cart]);
  const shipping = method === "livraison" ? (subtotal >= 60 ? 0 : 8.90) : 0;
  const total = subtotal + shipping;

  function update(k, v) { setForm(f => ({ ...f, [k]: v })); }

  function submit(e) {
    e.preventDefault();
    onConfirm({ method, total, items: cart.length, name: `${form.prenom} ${form.nom}` });
  }

  if (cart.length === 0) {
    return (
      <section className="bp-section" style={{ textAlign: "center", padding: "96px 32px" }}>
        <LighthouseMark size={64} color="var(--bp-teal-soft)" />
        <h2 className="bp-display" style={{ fontSize: 40, marginTop: 16 }}>Le panier est vide.</h2>
        <p style={{ color: "var(--bp-ink-soft)" }}>Difficile de passer commande sans bière dedans.</p>
        <button className="bp-btn" style={{ marginTop: 20 }} onClick={() => go("bieres")}>Voir les bières</button>
      </section>
    );
  }

  return (
    <section className="bp-checkout">
      <form onSubmit={submit}>
        <div className="bp-breadcrumb">
          <a onClick={() => go("accueil")}>Accueil</a>
          <span>·</span>
          <span style={{ color: "var(--bp-ink)" }}>Commande</span>
        </div>
        <h2>Finaliser ma commande</h2>

        <fieldset className="bp-fieldset" style={{ border: 0, padding: 0, margin: "0 0 32px" }}>
          <legend>Mode de retrait</legend>
          <div className="bp-method-grid">
            <div className={"bp-method" + (method === "livraison" ? " selected" : "")} onClick={() => setMethod("livraison")}>
              <strong>Livraison à domicile</strong>
              <small>Normandie · 48–72h · {subtotal >= 60 ? "offerte dès 60€" : "8,90 €"}</small>
            </div>
            <div className={"bp-method" + (method === "retrait" ? " selected" : "")} onClick={() => setMethod("retrait")}>
              <strong>Retrait à la brasserie</strong>
              <small>Cany-Barville · gratuit · prêt sous 24h</small>
            </div>
          </div>
        </fieldset>

        <fieldset className="bp-fieldset" style={{ border: 0, padding: 0 }}>
          <legend>Vos coordonnées</legend>
          <div className="bp-row">
            <div className="bp-field"><label>Prénom</label><input required value={form.prenom} onChange={e => update("prenom", e.target.value)} /></div>
            <div className="bp-field"><label>Nom</label><input required value={form.nom} onChange={e => update("nom", e.target.value)} /></div>
          </div>
          <div className="bp-row">
            <div className="bp-field"><label>E-mail</label><input type="email" required value={form.email} onChange={e => update("email", e.target.value)} /></div>
            <div className="bp-field"><label>Téléphone</label><input type="tel" required value={form.phone} onChange={e => update("phone", e.target.value)} /></div>
          </div>
        </fieldset>

        {method === "livraison" ? (
          <fieldset className="bp-fieldset" style={{ border: 0, padding: 0 }}>
            <legend>Adresse de livraison</legend>
            <div className="bp-field"><label>Adresse</label><input required placeholder="N° et rue" value={form.adresse} onChange={e => update("adresse", e.target.value)} /></div>
            <div className="bp-row">
              <div className="bp-field"><label>Code postal</label><input required value={form.cp} onChange={e => update("cp", e.target.value)} /></div>
              <div className="bp-field"><label>Ville</label><input required value={form.ville} onChange={e => update("ville", e.target.value)} /></div>
            </div>
          </fieldset>
        ) : (
          <fieldset className="bp-fieldset" style={{ border: 0, padding: 0 }}>
            <legend>Créneau de retrait</legend>
            <div className="bp-field">
              <label>Quand venez-vous chercher la commande&nbsp;?</label>
              <select value={form.pickupDate} onChange={e => update("pickupDate", e.target.value)}>
                <option>Jeudi 28 mai · 17h–19h</option>
                <option>Jeudi 28 mai · 19h–22h</option>
                <option>Vendredi 29 mai · 17h–19h</option>
                <option>Vendredi 29 mai · 19h–22h</option>
                <option>Samedi 30 mai · 10h–12h</option>
                <option>Samedi 30 mai · 17h–19h</option>
                <option>Samedi 30 mai · 19h–22h</option>
              </select>
            </div>
            <div style={{ padding: 16, background: "var(--bp-cream)", border: "1px solid var(--bp-rule)", borderRadius: 6, marginTop: 8, display: "flex", gap: 12, alignItems: "flex-start" }}>
              <Icon name="pin" size={20} />
              <div style={{ fontSize: 14, color: "var(--bp-ink-soft)" }}>
                <strong style={{ display: "block", color: "var(--bp-ink)" }}>{BREWERY.address}</strong>
                Sonnez à l'atelier, on vous accueille avec une dégustation offerte.
              </div>
            </div>
          </fieldset>
        )}

        <fieldset className="bp-fieldset" style={{ border: 0, padding: 0 }}>
          <legend>Paiement</legend>
          <div className="bp-method-grid">
            <div className={"bp-method" + (form.paiement === "cb" ? " selected" : "")} onClick={() => update("paiement", "cb")}>
              <strong>Carte bancaire</strong>
              <small>Visa · Mastercard · CB</small>
            </div>
            <div className={"bp-method" + (form.paiement === "place" ? " selected" : "")} onClick={() => update("paiement", "place")}>
              <strong>Sur place</strong>
              <small>CB ou espèces — au retrait uniquement</small>
            </div>
          </div>
          {form.paiement === "cb" && (
            <Fragment2>
              <div className="bp-field"><label>Numéro de carte</label><input placeholder="1234 5678 9012 3456" value={form.cb} onChange={e => update("cb", e.target.value)} required /></div>
              <div className="bp-row">
                <div className="bp-field"><label>Expiration</label><input placeholder="MM / AA" value={form.expiry} onChange={e => update("expiry", e.target.value)} required /></div>
                <div className="bp-field"><label>Cryptogramme</label><input placeholder="CVC" value={form.cvc} onChange={e => update("cvc", e.target.value)} required /></div>
              </div>
            </Fragment2>
          )}
        </fieldset>

        <fieldset className="bp-fieldset" style={{ border: 0, padding: 0 }}>
          <legend>Un petit mot pour les brasseurs&nbsp;?</legend>
          <div className="bp-field">
            <textarea rows="2" placeholder="Optionnel — précisions, dédicace, allergie…" value={form.notes} onChange={e => update("notes", e.target.value)}></textarea>
          </div>
        </fieldset>

        <p style={{ fontSize: 12, color: "var(--bp-ink-soft)", marginTop: 12 }}>
          En validant ma commande, je certifie avoir 18 ans ou plus. L'abus d'alcool est dangereux pour la santé, à consommer avec modération.
        </p>
      </form>

      <aside className="bp-summary">
        <h3>Récapitulatif</h3>
        {cart.map((it, i) => (
          <div key={i} className="bp-summary-line item">
            <span>{it.qty} × {it.name} <small style={{ color: "var(--bp-ink-soft)" }}>({it.format})</small></span>
            <span>{(it.price * it.qty).toFixed(2)} €</span>
          </div>
        ))}
        <hr/>
        <div className="bp-summary-line">
          <span>Sous-total</span>
          <span>{subtotal.toFixed(2)} €</span>
        </div>
        <div className="bp-summary-line">
          <span>{method === "livraison" ? "Livraison" : "Retrait sur place"}</span>
          <span>{shipping === 0 ? "Offert" : shipping.toFixed(2) + " €"}</span>
        </div>
        <hr/>
        <div className="total">
          <span style={{ fontFamily: "var(--bp-font-label)", textTransform: "uppercase", letterSpacing: ".14em", fontSize: 12 }}>Total</span>
          <b>{total.toFixed(2)} €</b>
        </div>
        <button className="bp-btn block lg" style={{ marginTop: 18 }} onClick={submit}>
          Valider la commande
        </button>
        <small style={{ display: "block", marginTop: 14, color: "var(--bp-ink-soft)", textAlign: "center", fontSize: 11 }}>
          Paiement sécurisé · 256 bits SSL
        </small>
      </aside>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// CONFIRMATION
// ─────────────────────────────────────────────────────────────────────────

function ConfirmPage({ order, go }) {
  const orderNo = useMemo2(() => "BDP-" + Math.random().toString(36).slice(2, 7).toUpperCase(), []);
  return (
    <section className="bp-confirm">
      <div className="bp-confirm-seal">
        <Icon name="check" size={42} />
      </div>
      <span className="bp-rule">Merci&nbsp;!</span>
      <h1 style={{ marginTop: 16 }}>Votre commande est<br/>en route vers le bord de mer.</h1>
      <p>Un e-mail de confirmation a été envoyé à votre adresse.</p>
      <p>
        {order?.method === "livraison"
          ? "Livraison prévue sous 48 à 72 heures."
          : "Vous pouvez venir retirer votre commande dès qu'on vous écrira (sous 24h)."}
      </p>
      <div className="order">Commande n° {orderNo} · {(order?.total || 0).toFixed(2)} €</div>
      <div style={{ marginTop: 40, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
        <button className="bp-btn" onClick={() => go("accueil")}>Retour à l'accueil</button>
        <button className="bp-btn ghost" onClick={() => go("bieres")}>Continuer mes achats</button>
      </div>
    </section>
  );
}

Object.assign(window, { EventsPage, OuTrouverPage, ContactPage, CartSheet, CheckoutPage, ConfirmPage });
