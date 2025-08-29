export type Locale = 'pt' | 'en';

const browser = typeof window !== 'undefined';

export function getInitialLocale(): Locale {
	if (!browser) return 'pt';
	const saved = (localStorage.getItem('locale') as Locale | null) ?? null;
	if (saved) return saved;
	const nav = navigator.language?.toLowerCase() ?? 'pt';
	return nav.startsWith('pt') ? 'pt' : 'en';
}

export function getLocale(): Locale {
	if (!browser) return 'pt';
	const saved = localStorage.getItem('locale') as Locale | null;
	return saved === 'pt' || saved === 'en' ? saved : getInitialLocale();
}

export function switchLocale(next: Locale) {
	if (!browser) return;
	localStorage.setItem('locale', next);
	document.documentElement.lang = next;
	window.dispatchEvent(new CustomEvent('localechange', { detail: next }));
}

type Dict = Record<string, string>;

type Dictionaries = Record<Locale, Dict>;

export const dictionaries: Dictionaries = {
	pt: {
		// Brand / Hero
		'brand.name': 'Breno',
		'hero.intro':
			'Olá! Sou um desenvolvedor <strong>fullstack</strong> que iniciou sua jornada na programação em 2023. Tenho paixão por tecnologia, gosto de explorar novos lugares, assistir bons filmes e transformar ideias em soluções digitais.',
		// Navigation
		'nav.home': 'Home',
		'nav.about': 'Sobre mim',
		'nav.projects': 'Projetos',
		'nav.experiences': 'Experiências',
		'nav.contact': 'Contato',

		// A11y
		'aria.open_menu': 'Abrir menu',
		'aria.switch_to_pt': 'Mudar para Português',
		'aria.switch_to_en': 'Switch to English',

		// Footer
		'footer.quote': 'Citação',
		'footer.quote_text': 'A melhor forma de prever o futuro é inventá-lo.',
		'footer.quote_author': '- Alan Kay',
		'footer.navigation': 'Navegação',
		'footer.connect': 'Conecte-se',
		'footer.about': 'Sobre',
		'footer.projects': 'Projetos',
		'footer.experiences': 'Experiências',
		'footer.contact': 'Contato',
		'footer.rights': 'Todos os direitos reservados.',

		// About section
		'about.title': 'Sobre mim',
		'about.who': 'Quem sou eu',
		'about.who_text':
			'Como mencionado, sou um desenvolvedor <strong>fullstack</strong>, mas tenho um carinho especial pelo desenvolvimento <strong>frontend</strong>, onde consigo unir criatividade e tecnologia. Estou sempre em busca de aprender novas ferramentas, boas práticas e formas de criar experiências digitais mais impactantes.',
		'about.skills': 'Habilidades',

		// Projects & Experience
		'projects.title': 'Alguns projetos',

		'experiences.title': 'Experiências',
		'experiences.1.role': 'Desenvolvedor Front-end',
		'experiences.1.company': 'Empresa XYZ',
		'experiences.1.period': '2022 - Presente',
		'experiences.1.desc':
			'Desenvolvimento de aplicações web responsivas, otimização de performance e trabalho em equipe com metodologias ágeis.',
		'experiences.2.role': 'Desenvolvedor Full-stack',
		'experiences.2.company': 'Startup ABC',
		'experiences.2.period': '2020 - 2022',
		'experiences.2.desc':
			'Desenvolvimento completo de aplicações web, desde o front-end até o back-end, incluindo banco de dados e APIs.',

		// Project detail page translations
		'projects.not_found': 'Projeto não encontrado',
		'projects.back_to_projects': 'Voltar aos Projetos',
		'projects.view_live': 'Ver Projeto',
		'projects.view_code': 'Ver Código',
		'projects.technologies': 'Tecnologias',
		'projects.description': 'Descrição',
		'projects.features': 'Funcionalidades',
		'projects.ongoing': 'Em andamento',
		'projects.status.completed': 'Concluído',
		'projects.status.in-progress': 'Em Progresso',
		'projects.status.planned': 'Planejado',

		'projects.see_more': 'Ver mais',

		// Detailed descriptions and features

		'contact.title': 'Contato',
		'contact.open_to_work': 'Aberto para trabalho e colaborações',
		'contact.email_label': 'EMAIL',
		'contact.location_label': 'LOCALIZAÇÃO',
		'contact.location_value': 'Minha localização',
		'form.name': 'Nome',
		'form.email': 'Email',
		'form.message': 'Mensagem',
		'form.placeholder.name': 'Insira seu nome',
		'form.placeholder.email': 'Insira seu email',
		'form.placeholder.message': 'Digite sua mensagem',
		'form.submit': 'Enviar',

		'projects.page.title': 'Projetos - Portfólio',
		'projects.page.description': 'Explore meu portfólio de projetos de desenvolvimento web',

		// Main heading and description
		'projects.heading.my': 'Meus',
		'projects.heading.projects': 'Projetos',
		'projects.description2':
			'Explore meu portfólio de projetos de desenvolvimento web, apresentando tecnologias modernas e soluções inovadoras.',

		// Filter buttons
		'projects.filter.all': 'Todos',

		// Empty state
		'projects.empty.title': 'Nenhum projeto encontrado',
		'projects.empty.description': 'Tente ajustar seus filtros ou volte mais tarde.',

		// Accessibility
		'projects.image.alt': 'Imagem do projeto',

		//PROJETO DUARTE:
		'projects.1.title': 'Duarte Distribuidora',
		'projects.1.desc': 'Sistema de gestão completo para distribuidora de bebidas.',

		'projects.1.detailed_desc':
			'Projeto desenvolvido para a Duarte Distribuidora de Bebidas. O sistema permite gerenciar múltiplas distribuidoras com recursos como estoque, financeiro, gastos, custos, dashboards personalizadas, cardápio digital, emissão de notas fiscais e integração com iFood. Iniciado em 2024 e atualmente em suas etapas finais, o sistema continua recebendo melhorias constantes.',
		'projects.1.feature1': 'Gerenciamento de produtos (cadastro, categorias e preços)',
		'projects.1.feature2': 'Controle de estoque com movimentações e alertas',
		'projects.1.feature3': 'Gestão financeira: gastos, custos e fluxo de caixa',
		'projects.1.feature4': 'Dashboards personalizadas para indicadores do negócio',
		'projects.1.feature5': 'Cardápio digital integrado',
		'projects.1.feature6': 'Integração com iFood',
		'projects.1.feature7': 'Emissão de notas fiscais eletrônicas',
		'projects.1.feature8': 'Suporte a múltiplas distribuidoras',
		'projects.1.feature9': 'PDV (Ponto de Venda)',
		'projects.1.feature10': 'Gestão de usuários e permissões',
		'projects.1.feature11': 'Gestão de clientes e fornecedores',

		//MYFOOD:
		'projects.2.title': 'MyFood',
		'projects.2.desc': 'Sistema para restaurantes gerenciar produtos, mesas e pedidos via QR Code.',
		'projects.2.detailed_desc':
			'Projeto desenvolvido como trabalho interdisciplinar de faculdade. O MyFood é um sistema completo para restaurantes, permitindo gerenciar produtos, cardápio e mesas com QR Code. O cliente escaneia o código da mesa, faz o pedido diretamente pelo celular, o pedido chega à cozinha e o pagamento é processado via integração com a API do Mercado Pago. O sistema também permite avaliações de clientes por prato.',

		// Funcionalidades
		'projects.2.feature1': 'Gerenciamento de produtos e cardápio',
		'projects.2.feature2': 'Controle de mesas com QR Code único',
		'projects.2.feature3': 'Pedidos realizados pelo cliente via celular',
		'projects.2.feature4': 'Envio automático dos pedidos para a cozinha',
		'projects.2.feature5': 'Pagamentos integrados com Mercado Pago',
		'projects.2.feature6': 'Avaliações de clientes por prato',
		//VILLA:
		'projects.3.title': 'Villa Rica Lofts',
		'projects.3.desc': 'Landing page do Villa Rica Lofts com informações e reservas.',

		'projects.3.detailed_desc':
			'Projeto desenvolvido para Villa Rica Lofts, um empreendimento localizado na Serra da Moeda. A landing page apresenta informações sobre o loft, galerias de fotos, integração com o sistema de reservas Hotelink e suporte a múltiplas páginas. Desenvolvido com Svelte, Directus como banco de dados, TailwindCSS e Paraglide para internacionalização.',

		// Funcionalidades
		'projects.3.feature1': 'Landing page com informações do empreendimento',
		'projects.3.feature2': 'Integração com sistema de reservas Hotelink',
		'projects.3.feature3': 'Múltiplas páginas internas (galeria, contato, sobre)',
		'projects.3.feature4': 'Internacionalização com Paraglide',
		'projects.3.feature5': 'Banco de dados gerenciado pelo Directus',

		//ROTA:
		// Projeto Rota 88 Mobile
		'projects.4.title': 'Rota 88 - Mobile',
		'projects.4.desc': 'App mobile para motoboys receberem e entregarem pedidos.',

		'projects.4.detailed_desc':
			'Rota 88 Mobile é um aplicativo desenvolvido para motoboys acompanharem seus pedidos em tempo real. Permite visualizar o mapa, rotas planejadas e detalhes dos pedidos a serem entregues. O projeto foi iniciado há 6 meses e finalizado em 29 de agosto de 2025, garantindo rastreabilidade e eficiência nas entregas.',
		'projects.4.feature1': 'Visualização de mapa com localização dos pedidos',
		'projects.4.feature2': 'Rotas otimizadas para entrega',
		'projects.4.feature3': 'Lista de pedidos a serem entregues',

		// Projeto Rota 88 Web
		'projects.5.title': 'Rota 88 - Web',
		'projects.5.desc': 'Plataforma web para gerenciamento logístico e pedidos em tempo real.',

		'projects.5.detailed_desc':
			'Rota 88 Web é uma plataforma web desacoplada do app mobile, focada em logística. Permite integração com plataformas de pedidos seguindo padrões abertos (ex: iFood, Saipos), gerenciamento de usuários, visualização em tempo real de pedidos e motoboys no mapa, além de relatórios personalizados. Desenvolvido com Svelte e SvelteKit, o backend utiliza Postgres.',
		'projects.5.feature1': 'Visualização em tempo real do mapa de pedidos e motoboys',
		'projects.5.feature2': 'Gerenciamento de usuários e permissões',
		'projects.5.feature3': 'Relatórios personalizados',
		'projects.5.feature4': 'Integração com plataformas de pedidos padrão Open Delivery'
	},
	en: {
		// Brand / Hero
		'brand.name': 'My Name Here',
		'hero.intro':
			'Hi! I am a <strong>fullstack developer</strong> who started coding in 2023. I am passionate about technology, love traveling, watching good movies, and turning ideas into digital solutions.',

		// Navigation
		'nav.home': 'Home',
		'nav.about': 'About',
		'nav.projects': 'Projects',
		'nav.experiences': 'Experience',
		'nav.contact': 'Contact',

		// A11y
		'aria.open_menu': 'Open menu',
		'aria.switch_to_pt': 'Switch to Portuguese',
		'aria.switch_to_en': 'Switch to English',

		// Footer
		'footer.quote': 'Quote',
		'footer.quote_text': 'The best way to predict the future is to invent it.',
		'footer.quote_author': '- Alan Kay',
		'footer.navigation': 'Navigation',
		'footer.connect': 'Connect',
		'footer.about': 'About',
		'footer.projects': 'Projects',
		'footer.experiences': 'Experience',
		'footer.contact': 'Contact',
		'footer.rights': 'All rights reserved.',

		// About section
		'about.title': 'About me',
		'about.who': 'Who am I',
		'about.who_text':
			'As mentioned, I am a <strong>fullstack developer</strong>, but I have a special passion for <strong>frontend development</strong>, where I can blend creativity with technology. I am constantly looking to learn new tools, best practices, and ways to create more impactful digital experiences.',
		'about.skills': 'Skills',

		// Projects & Experience
		'projects.title': 'Some projects',

		'experiences.title': 'Experience',
		'experiences.1.role': 'Front-end Developer',
		'experiences.1.company': 'Company XYZ',
		'experiences.1.period': '2022 - Present',
		'experiences.1.desc':
			'Responsive web development, performance optimization, and teamwork using agile methodologies.',
		'experiences.2.role': 'Full-stack Developer',
		'experiences.2.company': 'Startup ABC',
		'experiences.2.period': '2020 - 2022',
		'experiences.2.desc':
			'End-to-end web development from front-end to back-end, including databases and APIs.',

		// Project detail page translations
		'projects.not_found': 'Project not found',
		'projects.back_to_projects': 'Back to Projects',
		'projects.view_live': 'View Live',
		'projects.view_code': 'View Code',
		'projects.technologies': 'Technologies',
		'projects.description': 'Description',
		'projects.features': 'Features',
		'projects.ongoing': 'Ongoing',
		'projects.status.completed': 'Completed',
		'projects.status.in-progress': 'In Progress',
		'projects.status.planned': 'Planned',

		'projects.see_more': 'See more',

		// Detailed descriptions and features

		// Contact
		'contact.title': 'Contact',
		'contact.open_to_work': 'Open to work & Collabs',
		'contact.email_label': 'EMAIL',
		'contact.location_label': 'LOCATION',
		'contact.location_value': 'My location',

		// Form
		'form.name': 'Name',
		'form.email': 'Email',
		'form.message': 'Message',
		'form.placeholder.name': 'Please enter your name',
		'form.placeholder.email': 'Please enter your email',
		'form.placeholder.message': 'Enter your message',
		'form.submit': 'Submit',
		'projects.page.title': 'Projects - Portfolio',
		'projects.page.description': 'Explore my portfolio of web development projects',

		// Main heading and description
		'projects.heading.my': 'My',
		'projects.heading.projects': 'Projects',
		'projects.description2':
			'Explore my portfolio of web development projects, showcasing modern technologies and innovative solutions.',

		// Filter buttons
		'projects.filter.all': 'All',

		// Empty state
		'projects.empty.title': 'No projects found',
		'projects.empty.description': 'Try adjusting your filters or check back later.',

		// Accessibility
		'projects.image.alt': 'Project image',

		//DUARTE:
		'projects.1.title': 'Duarte Distribuidora',
		'projects.1.desc': 'Complete management system for a beverage distribution company.',

		'projects.1.detailed_desc':
			'Project developed for Duarte Distribuidora de Bebidas. The system manages multiple distributors with features such as inventory, finance, expenses, cost tracking, custom dashboards, digital menu, invoicing, and iFood integration. Started in 2024 and currently in its final stages, the system is still being improved and expanded.',
		'projects.1.feature1': 'Product management (catalog, categories, and pricing)',
		'projects.1.feature2': 'Inventory control with movements and alerts',
		'projects.1.feature3': 'Financial management: expenses, costs, and cash flow',
		'projects.1.feature4': 'Custom dashboards for business insights',
		'projects.1.feature5': 'Integrated digital menu',
		'projects.1.feature6': 'iFood integration',
		'projects.1.feature7': 'Electronic invoicing (NF-e)',
		'projects.1.feature8': 'Multi-distributor support',
		'projects.1.feature9': 'POS (Point of Sale)',
		'projects.1.feature10': 'User and role management',
		'projects.1.feature11': 'Customer and supplier management',

		//MYFOOD:
		'projects.2.title': 'MyFood',
		'projects.2.desc': 'Restaurant system for managing products, tables, and QR Code orders.',

		'projects.2.detailed_desc':
			'Developed as an interdisciplinary college project, MyFood is a complete system for restaurants. It allows managing products, menus, and tables with unique QR Codes. Customers scan the table QR code, place their order directly from their phone, the order is sent to the kitchen, and payments are handled via Mercado Pago API integration. The system also supports customer reviews for each dish.',

		// Features
		'projects.2.feature1': 'Product and menu management',
		'projects.2.feature2': 'Table management with unique QR Codes',
		'projects.2.feature3': 'Customer self-service ordering via phone',
		'projects.2.feature4': 'Orders automatically sent to the kitchen',
		'projects.2.feature5': 'Payments integrated with Mercado Pago',
		'projects.2.feature6': 'Customer reviews by dish',

		//VILLA:
		'projects.3.title': 'Villa Rica Lofts',
		'projects.3.desc': 'Landing page for Villa Rica Lofts with information and reservations.',

		'projects.3.detailed_desc':
			'Project developed for Villa Rica Lofts, a property located in Serra da Moeda. The landing page showcases property details, photo galleries, integrates with the Hotelink reservation system, and supports multiple internal pages. Built with Svelte, Directus as database, TailwindCSS, and Paraglide for internationalization.',

		// Features
		'projects.3.feature1': 'Landing page with property information',
		'projects.3.feature2': 'Integration with Hotelink reservation system',
		'projects.3.feature3': 'Multiple internal pages (gallery, contact, about)',
		'projects.3.feature4': 'Internationalization with Paraglide',
		'projects.3.feature5': 'Database managed with Directus',

		//ROTA:
		'projects.4.title': 'Rota 88 - Mobile',
		'projects.4.desc': 'Mobile app for couriers to receive and deliver orders.',

		'projects.4.detailed_desc':
			'Rota 88 Mobile is an app developed for delivery drivers to monitor their orders in real-time. It allows map visualization, planned routes, and details of pending deliveries. The project started 6 months ago and was completed on August 29, 2025, ensuring delivery tracking and efficiency.',
		'projects.4.feature1': 'Map view with order locations',
		'projects.4.feature2': 'Optimized delivery routes',
		'projects.4.feature3': 'List of orders to deliver',

		// Projeto Rota 88 Web
		'projects.5.title': 'Rota 88 - Web',
		'projects.5.desc': 'Web platform for logistics management and real-time order tracking.',

		'projects.5.detailed_desc':
			'Rota 88 Web is a platform decoupled from the mobile app, focused on logistics. It supports integration with order platforms following open standards (e.g., iFood, Saipos), user management, real-time map visualization of orders and drivers, and custom reports. Built with Svelte and SvelteKit, the backend uses Postgres.',
		'projects.5.feature1': 'Real-time map view of orders and delivery drivers',
		'projects.5.feature2': 'User and role management',
		'projects.5.feature3': 'Custom reports',
		'projects.5.feature4': 'Integration with order platforms following Open Delivery standards'
	}
};

export function translate(key: string, locale?: Locale): string {
	const l = locale ?? getLocale();
	return dictionaries[l]?.[key] ?? key;
}
