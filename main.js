const ASSETS = {
  hero: '/manus-storage/async-images/QT4uoAhb5gdTR6WSXdjCzg/image-1.webp',
  scrunchie: '/manus-storage/async-images/QT4uoAhb5gdTR6WSXdjCzg/image-2.webp',
  wristlet: '/manus-storage/async-images/QT4uoAhb5gdTR6WSXdjCzg/image-3.webp',
  miniMeadow: '/manus-storage/async-images/QT4uoAhb5gdTR6WSXdjCzg/image-4.webp',
  celebrateBloom: '/manus-storage/async-images/QT4uoAhb5gdTR6WSXdjCzg/image-5.webp'
};

const PRODUCTS = [
  { id: 'petal-pause', name: 'Petal Pause Scrunchie', category: 'Accessories', price: 12, description: 'A soft satin scrunchie with a tiny flower accent for a little lift in your everyday.', image: ASSETS.scrunchie, tone: 'pink' },
  { id: 'garden-loop', name: 'Garden Loop Wristlet', category: 'Accessories', price: 16, description: 'A coordinating wrist accessory finished with a delicate floral charm.', image: ASSETS.wristlet, tone: 'sage' },
  { id: 'pressed-posy', name: 'Pressed Posy Hair Clip', category: 'Accessories', price: 10, description: 'A petite floral detail made for tucking into a half-up moment or gifting to a friend.', image: ASSETS.scrunchie, tone: 'cream' },
  { id: 'mini-meadow', name: 'Mini Meadow Set', category: 'Gift Sets', price: 30, description: 'A sweet trio of little details, bundled in a ready-to-give cream box.', image: ASSETS.miniMeadow, tone: 'pink' },
  { id: 'celebrate-bloom', name: 'Celebrate in Bloom', category: 'Gift Sets', price: 42, description: 'A thoughtful floral collection for birthdays, new chapters, and just-because moments.', image: ASSETS.celebrateBloom, tone: 'sage' },
  { id: 'friendship-flora', name: 'Friendship Flora Duo', category: 'Gift Sets', price: 26, description: 'Two coordinating accessories to keep a shared little ritual close.', image: ASSETS.miniMeadow, tone: 'cream' }
];

const GIFT_SETS = [
  { id: 'mini-meadow', eyebrow: 'For the little wins', title: 'Mini Meadow', occasion: 'Birthday', price: 30, description: 'A cheerful bundle for the friend who notices every small beautiful thing.', image: ASSETS.miniMeadow, color: 'blush' },
  { id: 'friendship-flora', eyebrow: 'For your favorite person', title: 'Friendship Flora', occasion: 'Friendship', price: 26, description: 'A coordinating duo for the two of you, with just enough whimsy to feel personal.', image: ASSETS.miniMeadow, color: 'sage' },
  { id: 'celebrate-bloom', eyebrow: 'For a new chapter', title: 'Celebrate in Bloom', occasion: 'Special occasions', price: 42, description: 'A considered floral collection for the moments that deserve a little more bloom.', image: ASSETS.celebrateBloom, color: 'cream' }
];

let activeFilter = 'All';
let cart = loadCart();

function loadCart() {
  try { return JSON.parse(localStorage.getItem('bloombuddy-cart') || '[]'); } catch { return []; }
}

function saveCart() {
  localStorage.setItem('bloombuddy-cart', JSON.stringify(cart));
}

function money(value) {
  return `$${value.toFixed(2)}`;
}

function icon(name, size = 20) {
  const paths = {
    arrow: '<path d="M4 12h15M13 6l6 6-6 6"/>',
    bag: '<path d="M5 8.5h14l1 11H4l1-11Z"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    instagram: '<rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.5"/><circle cx="17.5" cy="6.5" r=".75" fill="currentColor" stroke="none"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
    sparkle: '<path d="m12 3 1.5 6.5L20 12l-6.5 1.5L12 20l-1.5-6.5L4 12l6.5-2.5L12 3Z"/>'
  };
  return `<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${paths[name] || ''}</svg>`;
}

function logo() {
  return `<a class="logo" href="/" data-link aria-label="BloomBuddy home"><span class="logo-mark" aria-hidden="true"><svg viewBox="0 0 40 40"><path d="M20 35c0-7.8 1.7-14.3 6.9-20.4"/><path d="M20.1 28.4c-5.6-1.9-8.9-5.9-10.2-11.7 5.9.5 10.1 3 10.2 11.7Z"/><path d="M22 22c.1-6.9 3.1-11.4 8.9-14.3 1 6-1.6 10.8-8.9 14.3Z"/><circle cx="20" cy="12" r="4.3"/><path d="M17.2 10.4c1.8-3.2 4.9-4 7-1.6-1.6 2.2-3.5 3.2-7 1.6Z"/></svg></span><span class="logo-word">Bloom<span>Buddy</span></span></a>`;
}

function header() {
  const path = window.location.pathname;
  return `<header class="site-header"><div class="shell header-inner">${logo()}<nav class="desktop-nav" aria-label="Primary navigation"><a href="/" data-link class="${path === '/' ? 'active' : ''}">Home</a><a href="/shop" data-link class="${path === '/shop' ? 'active' : ''}">Shop</a><a href="/gift-sets" data-link class="${path === '/gift-sets' ? 'active' : ''}">Gift Sets</a><a href="/about" data-link class="${path === '/about' ? 'active' : ''}">Our Story</a><a href="/contact" data-link class="${path === '/contact' ? 'active' : ''}">Contact</a></nav><div class="header-actions"><button class="icon-button cart-trigger" type="button" aria-label="Open shopping bag">${icon('bag')}<span class="cart-count">${cartCount()}</span></button><button class="icon-button menu-trigger" type="button" aria-label="Open navigation menu" aria-expanded="false">${icon('menu')}</button></div></div><div class="mobile-nav" aria-hidden="true"><div class="shell"><a href="/" data-link>Home</a><a href="/shop" data-link>Shop</a><a href="/gift-sets" data-link>Gift Sets</a><a href="/about" data-link>Our Story</a><a href="/contact" data-link>Contact</a></div></div></header>`;
}

function footer() {
  return `<footer class="site-footer"><div class="shell footer-grid"><div class="footer-brand"><div class="footer-logo">${logo()}</div><p>Floral-inspired little luxuries for your own style and their next smile.</p><div class="footer-socials"><a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram placeholder">${icon('instagram')}</a><a href="mailto:hello@bloombuddy.example" aria-label="Email BloomBuddy">${icon('mail')}</a></div></div><div><p class="footer-title">Explore</p><a href="/shop" data-link>Shop accessories</a><a href="/gift-sets" data-link>Find a gift</a><a href="/about" data-link>Our story</a></div><div><p class="footer-title">Need a hand?</p><a href="/contact" data-link>Contact us</a><a href="mailto:hello@bloombuddy.example">hello@bloombuddy.example</a><span class="footer-note">Reply times are a placeholder for launch.</span></div></div><div class="shell footer-bottom"><span>© ${new Date().getFullYear()} BloomBuddy</span><span>Small details. Your own style.</span></div></footer>`;
}

function cartCount() { return cart.reduce((sum, item) => sum + item.quantity, 0); }
function cartTotal() { return cart.reduce((sum, item) => sum + item.price * item.quantity, 0); }

function cartDrawer() {
  return `<div class="drawer-backdrop" data-close-cart></div><aside class="cart-drawer" aria-label="Shopping bag" aria-hidden="true"><div class="drawer-head"><div><p class="eyebrow">Your little collection</p><h2>Shopping bag <span class="drawer-count">(${cartCount()})</span></h2></div><button class="icon-button" type="button" data-close-cart aria-label="Close shopping bag">${icon('close')}</button></div><div class="cart-items">${cartMarkup()}</div></aside>`;
}

function cartMarkup() {
  if (!cart.length) return `<div class="empty-cart"><span class="empty-icon">${icon('sparkle', 28)}</span><h3>Your bag is taking a pause.</h3><p>Add a little bloom to get started.</p><a class="button button-dark" href="/shop" data-link>Browse the shop ${icon('arrow', 17)}</a></div>`;
  return `<div class="cart-list">${cart.map(item => `<div class="cart-item"><img src="${item.image}" alt="${item.name}" /><div class="cart-item-info"><h3>${item.name}</h3><span>${money(item.price)}</span><div class="quantity-control"><button type="button" data-qty="decrease" data-id="${item.id}" aria-label="Decrease ${item.name} quantity">${icon('minus', 14)}</button><span>${item.quantity}</span><button type="button" data-qty="increase" data-id="${item.id}" aria-label="Increase ${item.name} quantity">${icon('plus', 14)}</button></div></div><button class="remove-item" type="button" data-remove="${item.id}" aria-label="Remove ${item.name}">${icon('close', 15)}</button></div>`).join('')}</div><div class="cart-summary"><div><span>Subtotal</span><strong>${money(cartTotal())}</strong></div><p>Taxes and shipping are calculated at checkout.</p><button class="button button-dark checkout-button" type="button">Continue to checkout ${icon('arrow', 17)}</button></div>`;
}

function modalShell() { return `<div class="modal-backdrop" data-close-modal></div><div class="product-modal" role="dialog" aria-modal="true" aria-label="Product details" aria-hidden="true"></div><div class="toast" role="status" aria-live="polite"></div>`; }

function pageIntro(kicker, title, body, theme = '') {
  return `<section class="page-intro ${theme}"><div class="shell narrow"><p class="eyebrow">${kicker}</p><h1>${title}</h1><p class="lede">${body}</p></div></section>`;
}

function button(label, href, variant = 'dark', extra = '') {
  return `<a class="button button-${variant}" href="${href}" data-link ${extra}>${label} ${icon('arrow', 17)}</a>`;
}

function productCard(product, featured = false) {
  return `<article class="product-card ${featured ? 'featured-card' : ''}"><button class="product-image ${product.tone}" type="button" data-product="${product.id}" aria-label="View details for ${product.name}"><img src="${product.image}" alt="${product.name}" loading="lazy" /><span class="image-label">${product.category === 'Gift Sets' ? 'Gift set' : 'Everyday favorite'}</span></button><div class="product-card-copy"><div><p class="product-category">${product.category}</p><h3>${product.name}</h3></div><span class="product-price">${money(product.price)}</span><p>${product.description}</p><div class="card-actions"><button class="text-button" type="button" data-product="${product.id}">View details ${icon('arrow', 15)}</button><button class="add-button" type="button" data-add="${product.id}" aria-label="Add ${product.name} to bag">Add ${icon('plus', 16)}</button></div></div></article>`;
}

function giftCard(gift) {
  return `<article class="gift-card ${gift.color}"><div class="gift-image"><img src="${gift.image}" alt="${gift.title} gift set" loading="lazy" /><span class="occasion-pill">${gift.occasion}</span></div><div class="gift-copy"><p class="eyebrow">${gift.eyebrow}</p><h3>${gift.title}</h3><p>${gift.description}</p><div class="gift-bottom"><strong>${money(gift.price)}</strong><button class="text-button" type="button" data-add="${gift.id}">Shop set ${icon('arrow', 15)}</button></div></div></article>`;
}

function renderHome() {
  const featured = PRODUCTS.slice(0, 3);
  return `<div class="home-page"><section class="hero"><div class="shell hero-grid"><div class="hero-copy"><p class="eyebrow">Small details. Your own style.</p><h1>Find your <em>everyday</em> bloom.</h1><p class="hero-lede">Floral-inspired accessories and giftable little luxuries for the moments worth making a little more special.</p><div class="hero-actions">${button('Shop the collection', '/shop', 'dark')}<a class="underlined-link" href="/gift-sets" data-link>Find a thoughtful gift ${icon('arrow', 16)}</a></div><div class="hero-note"><span>${icon('sparkle', 18)}</span><span>Easy to love, easy to give.</span></div></div><div class="hero-visual"><div class="hero-blob"></div><img src="${ASSETS.hero}" alt="Pastel flowers and a floral-inspired accessory arranged on linen" /><div class="hero-sticker"><span>made for</span><strong>little<br />joys</strong></div></div></div></section><section class="marquee"><div><span>floral details</span><i>✳</i><span>thoughtful gifting</span><i>✳</i><span>your own style</span><i>✳</i><span>floral details</span><i>✳</i><span>thoughtful gifting</span></div></section><section class="section featured-section"><div class="shell"><div class="section-heading"><div><p class="eyebrow">A little something</p><h2>Made to be <em>kept close.</em></h2></div>${button('Shop all pieces', '/shop', 'outline')}</div><div class="product-grid featured-grid">${featured.map(product => productCard(product, true)).join('')}</div></div></section><section class="section gift-preview"><div class="shell"><div class="section-heading"><div><p class="eyebrow">Give a little bloom</p><h2>Gifts with a <em>soft spot.</em></h2></div><a class="underlined-link" href="/gift-sets" data-link>See all gift sets ${icon('arrow', 16)}</a></div><div class="gift-grid">${GIFT_SETS.map(giftCard).join('')}</div></div></section><section class="section about-strip"><div class="shell about-strip-grid"><div class="about-flower-art"><span class="art-ring"></span><span class="art-petal petal-one"></span><span class="art-petal petal-two"></span><span class="art-petal petal-three"></span><span class="art-stem"></span></div><div class="about-strip-copy"><p class="eyebrow">The BloomBuddy way</p><h2>Small details can say <em>so much.</em></h2><p>We make floral-inspired pieces that help you show up as yourself — and make it easy to say, “I saw this and thought of you.”</p>${button('Read our story', '/about', 'dark')}</div></div></section><section class="section benefits-section"><div class="shell"><div class="center-heading"><p class="eyebrow">Why BloomBuddy?</p><h2>Good things, <em>thoughtfully made.</em></h2></div><div class="benefits-grid"><div class="benefit"><span class="benefit-number">01</span><span class="benefit-icon">✿</span><h3>Thoughtful gifting</h3><p>Ready-to-give combinations that feel personal, never complicated.</p></div><div class="benefit"><span class="benefit-number">02</span><span class="benefit-icon">⌁</span><h3>Style with ease</h3><p>Little accents that slip into your routine and make it yours.</p></div><div class="benefit"><span class="benefit-number">03</span><span class="benefit-icon">♡</span><h3>Lovely, not lofty</h3><p>Joyful details at an everyday price point, so gifting can stay generous.</p></div></div></div></section><section class="final-cta"><div class="shell final-cta-inner"><div><p class="eyebrow">Your next little detail</p><h2>Ready to bloom?</h2></div>${button('Explore BloomBuddy', '/shop', 'light')}</div></section></div>`;
}

function renderShop() {
  const categories = ['All', 'Accessories', 'Gift Sets'];
  const filtered = activeFilter === 'All' ? PRODUCTS : PRODUCTS.filter(product => product.category === activeFilter);
  return `<div class="shop-page">${pageIntro('The edit', 'A little bloom for every day.', 'Browse floral-inspired accessories and giftable sets designed to make ordinary moments feel a little more like yours.', 'intro-pink')}<section class="section shop-section"><div class="shell"><div class="shop-toolbar"><div class="filter-tabs" role="tablist" aria-label="Shop categories">${categories.map(category => `<button class="filter-tab ${activeFilter === category ? 'active' : ''}" type="button" data-filter="${category}" role="tab" aria-selected="${activeFilter === category}">${category}</button>`).join('')}</div><span class="product-count">${filtered.length} ${filtered.length === 1 ? 'piece' : 'pieces'}</span></div><div class="product-grid shop-grid">${filtered.map(product => productCard(product)).join('')}</div></div></section><section class="shop-note"><div class="shell shop-note-inner"><span class="note-sparkle">✳</span><div><p class="eyebrow">Need help choosing?</p><h2>Start with what feels <em>most you.</em></h2></div>${button('Browse gift sets', '/gift-sets', 'outline')}</div></section></div>`;
}

function renderGifts() {
  return `<div class="gift-page">${pageIntro('The gifting edit', 'Give them a little bloom.', 'Three easy ways to make an ordinary day feel considered — with combinations that are ready to wrap and lovely to open.', 'intro-sage')}<section class="section gift-sets-section"><div class="shell gift-stack">${GIFT_SETS.map((gift, index) => `<article class="gift-feature ${index % 2 ? 'reverse' : ''}"><div class="gift-feature-image ${gift.color}"><img src="${gift.image}" alt="${gift.title} gift collection" loading="lazy" /><span class="gift-index">0${index + 1}</span></div><div class="gift-feature-copy"><p class="eyebrow">${gift.occasion}</p><h2>${gift.title}</h2><p>${gift.description} Each piece is selected to work together, then tucked into a simple gift-ready presentation.</p><div class="gift-meta"><strong>${money(gift.price)}</strong><span>Curated set</span></div><div class="gift-feature-actions"><button class="button button-dark" type="button" data-add="${gift.id}">Shop this set ${icon('arrow', 17)}</button><a class="underlined-link" href="/contact" data-link>Ask us about gifting ${icon('arrow', 15)}</a></div></div></article>`).join('')}</div></section><section class="section gift-guide"><div class="shell gift-guide-inner"><div><p class="eyebrow">A tiny gifting guide</p><h2>It’s not about <em>more.</em></h2><p>It’s about noticing the color they always reach for, the little ritual they never skip, or the day that deserves a soft landing.</p></div><div class="guide-list"><div><span>01</span><p>Choose their mood</p></div><div><span>02</span><p>Add a personal note</p></div><div><span>03</span><p>Let the little detail speak</p></div></div></div></section><section class="final-cta"><div class="shell final-cta-inner"><div><p class="eyebrow">Want to make it extra personal?</p><h2>We’re here to help.</h2></div>${button('Send us a note', '/contact', 'light')}</div></section></div>`;
}

function renderAbout() {
  return `<div class="about-page">${pageIntro('The story behind the details', 'Made for the way you show you care.', 'BloomBuddy began with a simple idea: the smallest details can carry the biggest feeling.', 'intro-cream')}<section class="section story-section"><div class="shell story-grid"><div class="story-art"><div class="story-card story-card-one"><span>small</span><strong>joy</strong></div><div class="story-card story-card-two"><span>made to</span><strong>bloom</strong></div><div class="story-line"></div></div><div class="story-copy"><p class="eyebrow">Our beginning</p><h2>Flowers inspired the feeling. <em>You make it yours.</em></h2><p>BloomBuddy is a collection of floral-inspired accessories and affordable gift sets for the in-between moments: the first day at a new school, the birthday text you want to make feel bigger, or the ordinary Tuesday that deserves one small lovely thing.</p><p>We keep the details playful, the combinations easy, and the price point approachable — because personal style should feel like an invitation, not a rule.</p></div></div></section><section class="section mission-section"><div class="shell"><div class="center-heading"><p class="eyebrow">What guides us</p><h2>A softer way to <em>show up.</em></h2></div><div class="values-grid"><article><span class="value-icon">✿</span><h3>Mission</h3><p>Make everyday self-expression and meaningful gifting feel accessible, joyful, and easy to share.</p></article><article><span class="value-icon">⌁</span><h3>Vision</h3><p>A world where small details are noticed — and where your style always has room to grow.</p></article><article><span class="value-icon">♡</span><h3>Values</h3><p>Warmth over perfection. Creativity over sameness. Thoughtfulness in every little choice.</p></article></div></div></section><section class="about-quote"><div class="shell"><span class="quote-mark">“</span><blockquote>There’s always room for one more little beautiful thing.</blockquote><span class="quote-rule"></span><p>— the BloomBuddy point of view</p></div></section><section class="section about-end"><div class="shell about-end-inner"><div><p class="eyebrow">Come as you are</p><h2>Find the detail that feels <em>like you.</em></h2></div>${button('Shop the edit', '/shop', 'dark')}</div></section></div>`;
}

function renderContact() {
  return `<div class="contact-page">${pageIntro('Say hello', 'Let’s make it personal.', 'Have a gifting question, a styling thought, or just want to share a little joy? We’d love to hear from you.', 'intro-pink')}<section class="section contact-section"><div class="shell contact-grid"><div class="contact-aside"><p class="eyebrow">A note is always welcome</p><h2>Tell us what’s on your <em>mind.</em></h2><p>Use the form and we’ll keep your message in the right place. The details below are editable placeholders for your launch.</p><div class="contact-details"><div><span class="detail-icon">${icon('mail', 18)}</span><div><span class="detail-label">Email</span><a href="mailto:hello@bloombuddy.example">hello@bloombuddy.example</a></div></div><div><span class="detail-icon">${icon('instagram', 18)}</span><div><span class="detail-label">Social</span><a href="https://instagram.com" target="_blank" rel="noreferrer">@bloombuddy.example</a></div></div></div><div class="contact-flower">✿</div></div><form class="contact-form" novalidate><div class="form-row"><label for="name">Name <span>*</span></label><input id="name" name="name" autocomplete="name" required placeholder="Your name" /><small class="field-error" data-error="name"></small></div><div class="form-row"><label for="email">Email <span>*</span></label><input id="email" name="email" type="email" autocomplete="email" required placeholder="you@example.com" /><small class="field-error" data-error="email"></small></div><div class="form-row"><label for="subject">Subject <span>*</span></label><input id="subject" name="subject" required placeholder="What can we help with?" /><small class="field-error" data-error="subject"></small></div><div class="form-row"><label for="message">Message <span>*</span></label><textarea id="message" name="message" rows="6" required placeholder="Tell us a little more..."></textarea><small class="field-error" data-error="message"></small></div><button class="button button-dark" type="submit">Send your note ${icon('arrow', 17)}</button><p class="form-feedback" role="status" aria-live="polite"></p><p class="form-footnote">This demo form is ready for your preferred email or form provider at launch.</p></form></div></section></div>`;
}

function render404() { return `<div class="not-found"><div class="shell narrow"><span class="not-found-flower">✿</span><p class="eyebrow">A little detour</p><h1>This page hasn’t bloomed yet.</h1><p class="lede">Let’s take you somewhere lovely.</p>${button('Back to BloomBuddy', '/', 'dark')}</div></div>`; }

function renderPage() {
  switch (window.location.pathname) {
    case '/': return renderHome();
    case '/shop': return renderShop();
    case '/gift-sets': return renderGifts();
    case '/about': return renderAbout();
    case '/contact': return renderContact();
    default: return render404();
  }
}

function renderApp({ scroll = false } = {}) {
  document.querySelector('#app').innerHTML = `${header()}<main id="main-content">${renderPage()}</main>${footer()}${cartDrawer()}${modalShell()}`;
  document.title = ({ '/': 'BloomBuddy — Small Details. Your Own Style.', '/shop': 'Shop — BloomBuddy', '/gift-sets': 'Gift Sets — BloomBuddy', '/about': 'Our Story — BloomBuddy', '/contact': 'Contact — BloomBuddy' })[window.location.pathname] || 'BloomBuddy';
  bindEvents();
  if (scroll) window.scrollTo({ top: 0, behavior: 'smooth' });
}

function bindEvents() {
  document.querySelectorAll('[data-link]').forEach(link => link.addEventListener('click', event => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('mailto:')) return;
    event.preventDefault();
    navigate(href);
  }));
  document.querySelector('.menu-trigger')?.addEventListener('click', toggleMenu);
  document.querySelectorAll('.mobile-nav a').forEach(link => link.addEventListener('click', closeMenu));
  document.querySelector('.cart-trigger')?.addEventListener('click', openCart);
  document.querySelectorAll('[data-close-cart]').forEach(element => element.addEventListener('click', closeCart));
  document.querySelectorAll('[data-add]').forEach(buttonElement => buttonElement.addEventListener('click', () => addToCart(buttonElement.dataset.add)));
  document.querySelectorAll('[data-product]').forEach(buttonElement => buttonElement.addEventListener('click', () => openProduct(buttonElement.dataset.product)));
  document.querySelectorAll('[data-filter]').forEach(buttonElement => buttonElement.addEventListener('click', () => { activeFilter = buttonElement.dataset.filter; renderApp(); }));
  document.querySelectorAll('[data-qty]').forEach(buttonElement => buttonElement.addEventListener('click', () => updateQuantity(buttonElement.dataset.id, buttonElement.dataset.qty === 'increase' ? 1 : -1)));
  document.querySelectorAll('[data-remove]').forEach(buttonElement => buttonElement.addEventListener('click', () => removeFromCart(buttonElement.dataset.remove)));
  document.querySelector('.checkout-button')?.addEventListener('click', () => showToast('Checkout handoff ready — connect your preferred provider at launch.'));
  document.querySelector('[data-close-modal]')?.addEventListener('click', closeModal);
  document.querySelector('.contact-form')?.addEventListener('submit', handleContactSubmit);
}

function navigate(path) {
  if (window.location.pathname === path) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
  history.pushState({}, '', path);
  closeMenu();
  closeCart();
  renderApp({ scroll: true });
}

function toggleMenu() {
  const nav = document.querySelector('.mobile-nav');
  const trigger = document.querySelector('.menu-trigger');
  const isOpen = nav.classList.toggle('open');
  nav.setAttribute('aria-hidden', String(!isOpen));
  trigger?.setAttribute('aria-expanded', String(isOpen));
  trigger.innerHTML = icon(isOpen ? 'close' : 'menu');
}
function closeMenu() { document.querySelector('.mobile-nav')?.classList.remove('open'); }

function openCart() {
  document.querySelector('.cart-drawer')?.classList.add('open');
  document.querySelector('.drawer-backdrop')?.classList.add('open');
  document.querySelector('.cart-drawer')?.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
}
function closeCart() {
  document.querySelector('.cart-drawer')?.classList.remove('open');
  document.querySelector('.drawer-backdrop')?.classList.remove('open');
  document.querySelector('.cart-drawer')?.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
}

function addToCart(id) {
  const product = PRODUCTS.find(item => item.id === id) || GIFT_SETS.find(item => item.id === id) && PRODUCTS.find(item => item.id === id);
  if (!product) return;
  const existing = cart.find(item => item.id === product.id);
  if (existing) existing.quantity += 1;
  else cart.push({ ...product, quantity: 1 });
  saveCart();
  renderApp();
  openCart();
  showToast(`${product.name} added to your bag.`);
}
function updateQuantity(id, change) {
  const item = cart.find(entry => entry.id === id);
  if (!item) return;
  item.quantity += change;
  if (item.quantity <= 0) cart = cart.filter(entry => entry.id !== id);
  saveCart();
  renderApp();
  openCart();
}
function removeFromCart(id) { cart = cart.filter(item => item.id !== id); saveCart(); renderApp(); openCart(); }

function openProduct(id) {
  const product = PRODUCTS.find(item => item.id === id);
  if (!product) return;
  const modal = document.querySelector('.product-modal');
  modal.innerHTML = `<button class="modal-close icon-button" type="button" data-close-modal aria-label="Close product details">${icon('close')}</button><div class="modal-image"><img src="${product.image}" alt="${product.name}" /></div><div class="modal-copy"><p class="eyebrow">${product.category}</p><h2>${product.name}</h2><strong class="modal-price">${money(product.price)}</strong><p>${product.description}</p><p class="modal-note">A small detail, ready for your everyday or their next celebration.</p><button class="button button-dark" type="button" data-add="${product.id}">Add to bag ${icon('arrow', 17)}</button></div>`;
  modal.classList.add('open');
  document.querySelector('.modal-backdrop')?.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
  modal.querySelector('[data-close-modal]')?.addEventListener('click', closeModal);
  modal.querySelector('[data-add]')?.addEventListener('click', () => { closeModal(); addToCart(product.id); });
}
function closeModal() { document.querySelector('.product-modal')?.classList.remove('open'); document.querySelector('.modal-backdrop')?.classList.remove('open'); document.body.classList.remove('no-scroll'); }

function handleContactSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const fields = ['name', 'email', 'subject', 'message'];
  let valid = true;
  fields.forEach(name => {
    const field = form.elements[name];
    const error = form.querySelector(`[data-error="${name}"]`);
    let message = '';
    if (!field.value.trim()) message = 'Please add this detail.';
    if (name === 'email' && field.value && !field.validity.valid) message = 'Please use a valid email.';
    field.classList.toggle('invalid', Boolean(message));
    if (error) error.textContent = message;
    if (message) valid = false;
  });
  const feedback = form.querySelector('.form-feedback');
  if (!valid) { feedback.textContent = 'A couple of details need a little attention.'; feedback.className = 'form-feedback error'; return; }
  feedback.textContent = 'Thanks for your note — this demo is ready to connect to your inbox at launch.';
  feedback.className = 'form-feedback success';
  form.reset();
}
function showToast(message) { const toast = document.querySelector('.toast'); if (!toast) return; toast.textContent = message; toast.classList.add('show'); window.clearTimeout(window.__toastTimer); window.__toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2600); }

window.addEventListener('popstate', () => renderApp({ scroll: true }));
renderApp();
