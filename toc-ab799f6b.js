// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/avant-propos.html">Avant-propos</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter001.html"><strong aria-hidden="true">1.</strong> Un jour à très faible probabilité</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter002.html"><strong aria-hidden="true">2.</strong> Tout ce que je crois est faux</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter003.html"><strong aria-hidden="true">3.</strong> Comparer la réalité à ses alternatives</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter004.html"><strong aria-hidden="true">4.</strong> L&#39;hypothèse du Marché Efficient</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter005.html"><strong aria-hidden="true">5.</strong> L&#39;Erreur Fondamentale d&#39;Attribution</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter006.html"><strong aria-hidden="true">6.</strong> L&#39;illusion de la planification</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter007.html"><strong aria-hidden="true">7.</strong> Réciprocité</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter008.html"><strong aria-hidden="true">8.</strong> Biais positif</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter009.html"><strong aria-hidden="true">9.</strong> Titre effacé, Partie 1</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter010.html"><strong aria-hidden="true">10.</strong> Conscience de Soi, Partie 2</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter012.html"><strong aria-hidden="true">11.</strong> Contrôle des pulsions</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter013.html"><strong aria-hidden="true">12.</strong> Poser les mauvaises questions</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter014.html"><strong aria-hidden="true">13.</strong> L&#39;inconnu et l&#39;inconnaissable</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter015.html"><strong aria-hidden="true">14.</strong> Être consciencieux</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter016.html"><strong aria-hidden="true">15.</strong> Pensée latérale</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter017.html"><strong aria-hidden="true">16.</strong> Localiser l&#39;hypothèse</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter018.html"><strong aria-hidden="true">17.</strong> Hiérarchies de dominance</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter019.html"><strong aria-hidden="true">18.</strong> Gratification différée</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter020.html"><strong aria-hidden="true">19.</strong> Le Théorème de Bayes</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter021.html"><strong aria-hidden="true">20.</strong> Rationalisation</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter022.html"><strong aria-hidden="true">21.</strong> La méthode scientifique</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter023.html"><strong aria-hidden="true">22.</strong> Croyance en la croyance</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter024.html"><strong aria-hidden="true">23.</strong> Hypothèse de l&#39;intelligence machiavélique</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter025.html"><strong aria-hidden="true">24.</strong> Se retenir de proposer des solutions</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter026.html"><strong aria-hidden="true">25.</strong> Remarquer que l&#39;on est confus</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter027.html"><strong aria-hidden="true">26.</strong> Empathie</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter028.html"><strong aria-hidden="true">27.</strong> Réductionnisme</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter029.html"><strong aria-hidden="true">28.</strong> Biais égocentrique</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter030.html"><strong aria-hidden="true">29.</strong> Travail de groupe, partie 1</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter031.html"><strong aria-hidden="true">30.</strong> Travail de groupe, partie 2</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter032.html"><strong aria-hidden="true">31.</strong> Interlude : Gestion des finances personnelles</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter033.html"><strong aria-hidden="true">32.</strong> Problèmes de coordination, partie 1</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter034.html"><strong aria-hidden="true">33.</strong> Problèmes de coordination, partie 2</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter035.html"><strong aria-hidden="true">34.</strong> Problèmes de coordination, partie 3</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter036.html"><strong aria-hidden="true">35.</strong> Différences de statut</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter037.html"><strong aria-hidden="true">36.</strong> Interlude : Franchir la limite</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter038.html"><strong aria-hidden="true">37.</strong> Le péché capital</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter039.html"><strong aria-hidden="true">38.</strong> Faire semblant d&#39;être sage</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter040.html"><strong aria-hidden="true">39.</strong> Faire semblant d&#39;être sage, partie 2</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter041.html"><strong aria-hidden="true">40.</strong> Forçage frontal</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter042.html"><strong aria-hidden="true">41.</strong> Courage</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter043.html"><strong aria-hidden="true">42.</strong> Humanisme, partie 1</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter044.html"><strong aria-hidden="true">43.</strong> Humanisme, partie 2</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter045.html"><strong aria-hidden="true">44.</strong> Humanisme, partie 3</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter046.html"><strong aria-hidden="true">45.</strong> Humanisme, partie 4</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter047.html"><strong aria-hidden="true">46.</strong> Théorie de l&#39;identité individuelle</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter048.html"><strong aria-hidden="true">47.</strong> Priorités utilitaristes</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter049.html"><strong aria-hidden="true">48.</strong> Information à priori</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter050.html"><strong aria-hidden="true">49.</strong> Égocentrisme</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter051.html"><strong aria-hidden="true">50.</strong> Titre Effacé, partie 1</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter052.html"><strong aria-hidden="true">51.</strong> L&#39;Expérience de Prison de Stanford, partie 2</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter053.html"><strong aria-hidden="true">52.</strong> L&#39;Expérience de Prison de Stanford, partie 3</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter054.html"><strong aria-hidden="true">53.</strong> L&#39;Expérience de Prison de Stanford, partie 4</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter055.html"><strong aria-hidden="true">54.</strong> L&#39;Expérience de Prison de Stanford, partie 5</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter056.html"><strong aria-hidden="true">55.</strong> L&#39;Expérience de Prison de Stanford, partie 6 : Optimisation sous contraintes</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter057.html"><strong aria-hidden="true">56.</strong> L&#39;Expérience de Prison de Stanford, partie 7 : Cognition sous contraintes</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter058.html"><strong aria-hidden="true">57.</strong> L&#39;Expérience de Prison de Stanford, partie 8 : Cognition sous contraintes</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter059.html"><strong aria-hidden="true">58.</strong> L&#39;Expérience de Prison de Stanford, partie 9 : Curiosité</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter060.html"><strong aria-hidden="true">59.</strong> L&#39;Expérience de Prison de Stanford, partie 10</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter061.html"><strong aria-hidden="true">60.</strong> L&#39;Expérience de Prison de Stanford, partie 11 : Secret et franchise</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter062.html"><strong aria-hidden="true">61.</strong> L&#39;Expérience de Prison de Stanford, Fin</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter063.html"><strong aria-hidden="true">62.</strong> L&#39;Expérience de Prison de Stanford, Après coups</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter065.html"><strong aria-hidden="true">63.</strong> Mensonges contagieux</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter066.html"><strong aria-hidden="true">64.</strong> Accomplissement de soi, partie 1</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter067.html"><strong aria-hidden="true">65.</strong> Accomplissement de soi, partie 2</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter068.html"><strong aria-hidden="true">66.</strong> Accomplissement de soi, partie 3</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter069.html"><strong aria-hidden="true">67.</strong> Accomplissement de soi, partie 4</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter070.html"><strong aria-hidden="true">68.</strong> Accomplissement de soi, partie 5</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter071.html"><strong aria-hidden="true">69.</strong> Accomplissement de soi, partie 6</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter072.html"><strong aria-hidden="true">70.</strong> Accomplissement de soi, partie 7 : Déni plausible</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter073.html"><strong aria-hidden="true">71.</strong> Accomplissement de soi, partie 8 : Le Sacré et le Profane</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter074.html"><strong aria-hidden="true">72.</strong> Accomplissement de soi, partie 9 : Intensification des conflits</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter075.html"><strong aria-hidden="true">73.</strong> Accomplissement de soi, dernière partie : Responsabilité</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter076.html"><strong aria-hidden="true">74.</strong> Interlude avec le confesseur : coûts irrécupérables</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter077.html"><strong aria-hidden="true">75.</strong> Accomplissement de soi, Épilogues : Apparences superficielles</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter078.html"><strong aria-hidden="true">76.</strong> Compromis Tabous, Prélude : Tricherie</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter079.html"><strong aria-hidden="true">77.</strong> Compromis Tabous, partie 1</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter080.html"><strong aria-hidden="true">78.</strong> Compromis Tabous, partie 2 : Le halo d&#39;infamie</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter081.html"><strong aria-hidden="true">79.</strong> Compromis Tabous, partie 3</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter082.html"><strong aria-hidden="true">80.</strong> Compromis Tabous, Fin</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter083.html"><strong aria-hidden="true">81.</strong> Compromis Tabous, Après coup 1</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter084.html"><strong aria-hidden="true">82.</strong> Compromis Tabous, Après coup 2</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter085.html"><strong aria-hidden="true">83.</strong> Compromis Tabous, Après coup 3: Distance</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter086.html"><strong aria-hidden="true">84.</strong> Inférences multiples</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter087.html"><strong aria-hidden="true">85.</strong> Sensibilité hédonique</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter088.html"><strong aria-hidden="true">86.</strong> Pressions temporelles, partie 1</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter089.html"><strong aria-hidden="true">87.</strong> Pressions temporelles, partie 2</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter090.html"><strong aria-hidden="true">88.</strong> Rôles, partie 1</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter091.html"><strong aria-hidden="true">89.</strong> Rôles, partie 2</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter092.html"><strong aria-hidden="true">90.</strong> Rôles, partie 3</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter093.html"><strong aria-hidden="true">91.</strong> Rôles, partie 4</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter094.html"><strong aria-hidden="true">92.</strong> Rôles, partie 5</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter095.html"><strong aria-hidden="true">93.</strong> Rôles, partie 6</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter096.html"><strong aria-hidden="true">94.</strong> Rôles, partie 7</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter097.html"><strong aria-hidden="true">95.</strong> Rôles, partie 8 </a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter098.html"><strong aria-hidden="true">96.</strong> Rôles, fin</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter099.html"><strong aria-hidden="true">97.</strong> Rôles, Après-coup </a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter100.html"><strong aria-hidden="true">98.</strong> Mesures de précaution, partie 1</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter101.html"><strong aria-hidden="true">99.</strong> Mesures de précaution, partie 2</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter102.html"><strong aria-hidden="true">100.</strong> Préoccupation</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter103.html"><strong aria-hidden="true">101.</strong> Examens</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter104.html"><strong aria-hidden="true">102.</strong> La Vérité, partie 1 : Jeux du sort et réponses</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter105.html"><strong aria-hidden="true">103.</strong> La Vérité, partie 2</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter106.html"><strong aria-hidden="true">104.</strong> La Vérité, partie 3</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter107.html"><strong aria-hidden="true">105.</strong> La Vérité, partie 4</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter108.html"><strong aria-hidden="true">106.</strong> La Vérité, partie 5 : Réponses et Jeux du sort</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter109.html"><strong aria-hidden="true">107.</strong> Réflexions</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter110.html"><strong aria-hidden="true">108.</strong> Réflexions, partie 2</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter111.html"><strong aria-hidden="true">109.</strong> Échec, partie 1</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter112.html"><strong aria-hidden="true">110.</strong> Échec, partie 2</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter113.html"><strong aria-hidden="true">111.</strong> Examen Final</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter114.html"><strong aria-hidden="true">112.</strong> Tais-toi et accomplis l&#39;impossible</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter115.html"><strong aria-hidden="true">113.</strong> Tais-toi et accomplis l&#39;impossible, partie 2</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter116.html"><strong aria-hidden="true">114.</strong> Après-coup, quelque chose à protéger, partie 0</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter117.html"><strong aria-hidden="true">115.</strong> Après-coup, quelque chose à protéger : Minerva McGonagall</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter118.html"><strong aria-hidden="true">116.</strong> Après-coup, quelque chose à protéger : Professeur Quirrell</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter119.html"><strong aria-hidden="true">117.</strong> Après-coup, quelque chose à protéger : Albus Dumbledore</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter120.html"><strong aria-hidden="true">118.</strong> Après-coup, quelque chose à protéger : Draco Malfoy</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter121.html"><strong aria-hidden="true">119.</strong> Après-coup, quelque chose à protéger : Severus Rogue</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/chapter122.html"><strong aria-hidden="true">120.</strong> Après-coup, quelque chose à protéger : Hermione Granger</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="md/colophon.html">Colophon</a></span></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split('#')[0].split('?')[0];
        if (current_page.endsWith('/')) {
            current_page += 'index.html';
        }
        const links = Array.prototype.slice.call(this.querySelectorAll('a'));
        const l = links.length;
        for (let i = 0; i < l; ++i) {
            const link = links[i];
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The 'index' page is supposed to alias the first chapter in the book.
            if (link.href === current_page
                || i === 0
                && path_to_root === ''
                && current_page.endsWith('/index.html')) {
                link.classList.add('active');
                let parent = link.parentElement;
                while (parent) {
                    if (parent.tagName === 'LI' && parent.classList.contains('chapter-item')) {
                        parent.classList.add('expanded');
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', e => {
            if (e.target.tagName === 'A') {
                const clientRect = e.target.getBoundingClientRect();
                const sidebarRect = this.getBoundingClientRect();
                sessionStorage.setItem('sidebar-scroll-offset', clientRect.top - sidebarRect.top);
            }
        }, { passive: true });
        const sidebarScrollOffset = sessionStorage.getItem('sidebar-scroll-offset');
        sessionStorage.removeItem('sidebar-scroll-offset');
        if (sidebarScrollOffset !== null) {
            // preserve sidebar scroll position when navigating via links within sidebar
            const activeSection = this.querySelector('.active');
            if (activeSection) {
                const clientRect = activeSection.getBoundingClientRect();
                const sidebarRect = this.getBoundingClientRect();
                const currentOffset = clientRect.top - sidebarRect.top;
                this.scrollTop += currentOffset - parseFloat(sidebarScrollOffset);
            }
        } else {
            // scroll sidebar to current active section when navigating via
            // 'next/previous chapter' buttons
            const activeSection = document.querySelector('#mdbook-sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        const sidebarAnchorToggles = document.querySelectorAll('.chapter-fold-toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(el => {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define('mdbook-sidebar-scrollbox', MDBookSidebarScrollbox);


// ---------------------------------------------------------------------------
// Support for dynamically adding headers to the sidebar.

(function() {
    // This is used to detect which direction the page has scrolled since the
    // last scroll event.
    let lastKnownScrollPosition = 0;
    // This is the threshold in px from the top of the screen where it will
    // consider a header the "current" header when scrolling down.
    const defaultDownThreshold = 150;
    // Same as defaultDownThreshold, except when scrolling up.
    const defaultUpThreshold = 300;
    // The threshold is a virtual horizontal line on the screen where it
    // considers the "current" header to be above the line. The threshold is
    // modified dynamically to handle headers that are near the bottom of the
    // screen, and to slightly offset the behavior when scrolling up vs down.
    let threshold = defaultDownThreshold;
    // This is used to disable updates while scrolling. This is needed when
    // clicking the header in the sidebar, which triggers a scroll event. It
    // is somewhat finicky to detect when the scroll has finished, so this
    // uses a relatively dumb system of disabling scroll updates for a short
    // time after the click.
    let disableScroll = false;
    // Array of header elements on the page.
    let headers;
    // Array of li elements that are initially collapsed headers in the sidebar.
    // I'm not sure why eslint seems to have a false positive here.
    // eslint-disable-next-line prefer-const
    let headerToggles = [];
    // This is a debugging tool for the threshold which you can enable in the console.
    let thresholdDebug = false;

    // Updates the threshold based on the scroll position.
    function updateThreshold() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // The number of pixels below the viewport, at most documentHeight.
        // This is used to push the threshold down to the bottom of the page
        // as the user scrolls towards the bottom.
        const pixelsBelow = Math.max(0, documentHeight - (scrollTop + windowHeight));
        // The number of pixels above the viewport, at least defaultDownThreshold.
        // Similar to pixelsBelow, this is used to push the threshold back towards
        // the top when reaching the top of the page.
        const pixelsAbove = Math.max(0, defaultDownThreshold - scrollTop);
        // How much the threshold should be offset once it gets close to the
        // bottom of the page.
        const bottomAdd = Math.max(0, windowHeight - pixelsBelow - defaultDownThreshold);
        let adjustedBottomAdd = bottomAdd;

        // Adjusts bottomAdd for a small document. The calculation above
        // assumes the document is at least twice the windowheight in size. If
        // it is less than that, then bottomAdd needs to be shrunk
        // proportional to the difference in size.
        if (documentHeight < windowHeight * 2) {
            const maxPixelsBelow = documentHeight - windowHeight;
            const t = 1 - pixelsBelow / Math.max(1, maxPixelsBelow);
            const clamp = Math.max(0, Math.min(1, t));
            adjustedBottomAdd *= clamp;
        }

        let scrollingDown = true;
        if (scrollTop < lastKnownScrollPosition) {
            scrollingDown = false;
        }

        if (scrollingDown) {
            // When scrolling down, move the threshold up towards the default
            // downwards threshold position. If near the bottom of the page,
            // adjustedBottomAdd will offset the threshold towards the bottom
            // of the page.
            const amountScrolledDown = scrollTop - lastKnownScrollPosition;
            const adjustedDefault = defaultDownThreshold + adjustedBottomAdd;
            threshold = Math.max(adjustedDefault, threshold - amountScrolledDown);
        } else {
            // When scrolling up, move the threshold down towards the default
            // upwards threshold position. If near the bottom of the page,
            // quickly transition the threshold back up where it normally
            // belongs.
            const amountScrolledUp = lastKnownScrollPosition - scrollTop;
            const adjustedDefault = defaultUpThreshold - pixelsAbove
                + Math.max(0, adjustedBottomAdd - defaultDownThreshold);
            threshold = Math.min(adjustedDefault, threshold + amountScrolledUp);
        }

        if (documentHeight <= windowHeight) {
            threshold = 0;
        }

        if (thresholdDebug) {
            const id = 'mdbook-threshold-debug-data';
            let data = document.getElementById(id);
            if (data === null) {
                data = document.createElement('div');
                data.id = id;
                data.style.cssText = `
                    position: fixed;
                    top: 50px;
                    right: 10px;
                    background-color: 0xeeeeee;
                    z-index: 9999;
                    pointer-events: none;
                `;
                document.body.appendChild(data);
            }
            data.innerHTML = `
                <table>
                  <tr><td>documentHeight</td><td>${documentHeight.toFixed(1)}</td></tr>
                  <tr><td>windowHeight</td><td>${windowHeight.toFixed(1)}</td></tr>
                  <tr><td>scrollTop</td><td>${scrollTop.toFixed(1)}</td></tr>
                  <tr><td>pixelsAbove</td><td>${pixelsAbove.toFixed(1)}</td></tr>
                  <tr><td>pixelsBelow</td><td>${pixelsBelow.toFixed(1)}</td></tr>
                  <tr><td>bottomAdd</td><td>${bottomAdd.toFixed(1)}</td></tr>
                  <tr><td>adjustedBottomAdd</td><td>${adjustedBottomAdd.toFixed(1)}</td></tr>
                  <tr><td>scrollingDown</td><td>${scrollingDown}</td></tr>
                  <tr><td>threshold</td><td>${threshold.toFixed(1)}</td></tr>
                </table>
            `;
            drawDebugLine();
        }

        lastKnownScrollPosition = scrollTop;
    }

    function drawDebugLine() {
        if (!document.body) {
            return;
        }
        const id = 'mdbook-threshold-debug-line';
        const existingLine = document.getElementById(id);
        if (existingLine) {
            existingLine.remove();
        }
        const line = document.createElement('div');
        line.id = id;
        line.style.cssText = `
            position: fixed;
            top: ${threshold}px;
            left: 0;
            width: 100vw;
            height: 2px;
            background-color: red;
            z-index: 9999;
            pointer-events: none;
        `;
        document.body.appendChild(line);
    }

    function mdbookEnableThresholdDebug() {
        thresholdDebug = true;
        updateThreshold();
        drawDebugLine();
    }

    window.mdbookEnableThresholdDebug = mdbookEnableThresholdDebug;

    // Updates which headers in the sidebar should be expanded. If the current
    // header is inside a collapsed group, then it, and all its parents should
    // be expanded.
    function updateHeaderExpanded(currentA) {
        // Add expanded to all header-item li ancestors.
        let current = currentA.parentElement;
        while (current) {
            if (current.tagName === 'LI' && current.classList.contains('header-item')) {
                current.classList.add('expanded');
            }
            current = current.parentElement;
        }
    }

    // Updates which header is marked as the "current" header in the sidebar.
    // This is done with a virtual Y threshold, where headers at or below
    // that line will be considered the current one.
    function updateCurrentHeader() {
        if (!headers || !headers.length) {
            return;
        }

        // Reset the classes, which will be rebuilt below.
        const els = document.getElementsByClassName('current-header');
        for (const el of els) {
            el.classList.remove('current-header');
        }
        for (const toggle of headerToggles) {
            toggle.classList.remove('expanded');
        }

        // Find the last header that is above the threshold.
        let lastHeader = null;
        for (const header of headers) {
            const rect = header.getBoundingClientRect();
            if (rect.top <= threshold) {
                lastHeader = header;
            } else {
                break;
            }
        }
        if (lastHeader === null) {
            lastHeader = headers[0];
            const rect = lastHeader.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.top >= windowHeight) {
                return;
            }
        }

        // Get the anchor in the summary.
        const href = '#' + lastHeader.id;
        const a = [...document.querySelectorAll('.header-in-summary')]
            .find(element => element.getAttribute('href') === href);
        if (!a) {
            return;
        }

        a.classList.add('current-header');

        updateHeaderExpanded(a);
    }

    // Updates which header is "current" based on the threshold line.
    function reloadCurrentHeader() {
        if (disableScroll) {
            return;
        }
        updateThreshold();
        updateCurrentHeader();
    }


    // When clicking on a header in the sidebar, this adjusts the threshold so
    // that it is located next to the header. This is so that header becomes
    // "current".
    function headerThresholdClick(event) {
        // See disableScroll description why this is done.
        disableScroll = true;
        setTimeout(() => {
            disableScroll = false;
        }, 100);
        // requestAnimationFrame is used to delay the update of the "current"
        // header until after the scroll is done, and the header is in the new
        // position.
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                // Closest is needed because if it has child elements like <code>.
                const a = event.target.closest('a');
                const href = a.getAttribute('href');
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    threshold = targetElement.getBoundingClientRect().bottom;
                    updateCurrentHeader();
                }
            });
        });
    }

    // Takes the nodes from the given head and copies them over to the
    // destination, along with some filtering.
    function filterHeader(source, dest) {
        const clone = source.cloneNode(true);
        clone.querySelectorAll('mark').forEach(mark => {
            mark.replaceWith(...mark.childNodes);
        });
        dest.append(...clone.childNodes);
    }

    // Scans page for headers and adds them to the sidebar.
    document.addEventListener('DOMContentLoaded', function() {
        const activeSection = document.querySelector('#mdbook-sidebar .active');
        if (activeSection === null) {
            return;
        }

        const main = document.getElementsByTagName('main')[0];
        headers = Array.from(main.querySelectorAll('h2, h3, h4, h5, h6'))
            .filter(h => h.id !== '' && h.children.length && h.children[0].tagName === 'A');

        if (headers.length === 0) {
            return;
        }

        // Build a tree of headers in the sidebar.

        const stack = [];

        const firstLevel = parseInt(headers[0].tagName.charAt(1));
        for (let i = 1; i < firstLevel; i++) {
            const ol = document.createElement('ol');
            ol.classList.add('section');
            if (stack.length > 0) {
                stack[stack.length - 1].ol.appendChild(ol);
            }
            stack.push({level: i + 1, ol: ol});
        }

        // The level where it will start folding deeply nested headers.
        const foldLevel = 3;

        for (let i = 0; i < headers.length; i++) {
            const header = headers[i];
            const level = parseInt(header.tagName.charAt(1));

            const currentLevel = stack[stack.length - 1].level;
            if (level > currentLevel) {
                // Begin nesting to this level.
                for (let nextLevel = currentLevel + 1; nextLevel <= level; nextLevel++) {
                    const ol = document.createElement('ol');
                    ol.classList.add('section');
                    const last = stack[stack.length - 1];
                    const lastChild = last.ol.lastChild;
                    // Handle the case where jumping more than one nesting
                    // level, which doesn't have a list item to place this new
                    // list inside of.
                    if (lastChild) {
                        lastChild.appendChild(ol);
                    } else {
                        last.ol.appendChild(ol);
                    }
                    stack.push({level: nextLevel, ol: ol});
                }
            } else if (level < currentLevel) {
                while (stack.length > 1 && stack[stack.length - 1].level > level) {
                    stack.pop();
                }
            }

            const li = document.createElement('li');
            li.classList.add('header-item');
            li.classList.add('expanded');
            if (level < foldLevel) {
                li.classList.add('expanded');
            }
            const span = document.createElement('span');
            span.classList.add('chapter-link-wrapper');
            const a = document.createElement('a');
            span.appendChild(a);
            a.href = '#' + header.id;
            a.classList.add('header-in-summary');
            filterHeader(header.children[0], a);
            a.addEventListener('click', headerThresholdClick);
            const nextHeader = headers[i + 1];
            if (nextHeader !== undefined) {
                const nextLevel = parseInt(nextHeader.tagName.charAt(1));
                if (nextLevel > level && level >= foldLevel) {
                    const toggle = document.createElement('a');
                    toggle.classList.add('chapter-fold-toggle');
                    toggle.classList.add('header-toggle');
                    toggle.addEventListener('click', () => {
                        li.classList.toggle('expanded');
                    });
                    const toggleDiv = document.createElement('div');
                    toggleDiv.textContent = '❱';
                    toggle.appendChild(toggleDiv);
                    span.appendChild(toggle);
                    headerToggles.push(li);
                }
            }
            li.appendChild(span);

            const currentParent = stack[stack.length - 1];
            currentParent.ol.appendChild(li);
        }

        const onThisPage = document.createElement('div');
        onThisPage.classList.add('on-this-page');
        onThisPage.append(stack[0].ol);
        const activeItemSpan = activeSection.parentElement;
        activeItemSpan.after(onThisPage);
    });

    document.addEventListener('DOMContentLoaded', reloadCurrentHeader);
    document.addEventListener('scroll', reloadCurrentHeader, { passive: true });
})();

