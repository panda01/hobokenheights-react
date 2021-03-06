(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
class ContactForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			first_name: '',
			last_name: '',
			email: '',
			mobilephone: '',
			how_you_heard: '',
			how_can_we_help: ''
			// formSubmitted: '',
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.resetForm = this.resetForm.bind(this);
	}

	componentDidMount() {
		//This is a fix to detect changes on the select2
		jQuery(this.refs.how_you_heard).on("change", e => {
			this.handleInputChange(e);
		});
		this.createHubspotForm(); //this is used to create the form on load
	}

	createHubspotForm() {
		const { createHubspotContactForm } = this.props;
		createHubspotContactForm();
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});

		console.log('changed');
	}

	handleSubmit() {
		this.setState({
			// formSubmitted: true,
			first_name: '',
			last_name: '',
			email: '',
			mobilephone: '',
			how_you_heard: '',
			how_can_we_help: ''
		});
		const { formSubmitted } = this.props;
		formSubmitted();
	}
	resetForm() {
		// this.setState ({
		// 	formSubmitted: null
		// })
		const { formCleared } = this.props;
		formCleared();
	}

	scrollToTop() {
		const { scrollToFirstSlide } = this.props;
		scrollToFirstSlide();
	}

	render() {

		let contactFormClasses = 'contactForm';
		// if(this.state.formSubmitted){
		// 	contactFormClasses += ' submitted'
		// }
		const select2Styles = {
			width: "100%"
		};

		const select2Initialized = $('#how_did_you_hear_of_us_-4c41114a-2807-4884-b5e9-d6b49d56d217').hasClass("select2-hidden-accessible");
		if (!select2Initialized) {
			// $('.how_you_heard').select2({
			// 	placeholder: "How did you hear of us?*",
			// 	width: 'resolve',
			// 	minimumResultsForSearch: -1
			// });
			const hubspotFormExists = $('#how_did_you_hear_of_us_-4c41114a-2807-4884-b5e9-d6b49d56d217').length;
			if (hubspotFormExists) {
				const disabledOptionText = $('#how_did_you_hear_of_us_-4c41114a-2807-4884-b5e9-d6b49d56d217 option:disabled')[0].innerHTML;
				$('#how_did_you_hear_of_us_-4c41114a-2807-4884-b5e9-d6b49d56d217').select2({
					placeholder: disabledOptionText,
					width: 'resolve',
					minimumResultsForSearch: -1
				});
			}
		}
		return React.createElement(
			'form',
			{ className: contactFormClasses },
			React.createElement(
				'div',
				{ className: 'submittedFormOverlay' },
				React.createElement(
					'div',
					{ className: 'text' },
					'THANK YOU!'
				),
				React.createElement(
					'div',
					{ className: 'closeBtn', onClick: this.resetForm },
					React.createElement('img', { src: '/assets/images/form_close_btn.svg' })
				)
			),
			React.createElement(
				'div',
				{ className: 'headline' },
				'FOR INFORMATION PLEASE FILL THE FORM BELOW'
			),
			React.createElement('div', { className: 'hubspotFormWrapper', id: 'hubspotFormWrapper' })
		);
	}
}

module.exports = ContactForm;

},{}],2:[function(require,module,exports){
const ContactForm = require('./contactform.jsx');

class ContactFormSlide extends React.Component {
	constructor(props) {
		super(props);
	}
	contactFormSubmitted() {
		const { formSubmitted } = this.props;
		formSubmitted();
	}

	contactFormCleared() {
		const { formCleared } = this.props;
		formCleared();
	}

	scrollToTop() {
		const { scrollToFirstSlide } = this.props;
		scrollToFirstSlide();
	}

	createHubspotForm() {
		const { createHubspotContactForm } = this.props;
		createHubspotContactForm();
	}

	openPrivacyPolicyModal() {
		const { showPrivacyPolicy } = this.props;
		showPrivacyPolicy();
	}

	render() {
		return React.createElement(
			"div",
			{ className: "contactPageWrapper" },
			React.createElement(ContactForm, { createHubspotContactForm: this.createHubspotForm.bind(this), scrollToFirstSlide: this.scrollToTop.bind(this), formCleared: this.contactFormCleared.bind(this), formSubmitted: this.contactFormSubmitted.bind(this) }),
			React.createElement(
				"div",
				{ className: "privacyPolicy not-mobile" },
				React.createElement(
					"div",
					{ className: "verticalLineContainer" },
					React.createElement("div", { className: "verticalLine" })
				),
				React.createElement("img", { className: "logo", src: this.props.slideObj.contactLogo }),
				React.createElement(
					"div",
					{ className: "contactInfo" },
					React.createElement(
						"div",
						{ className: "address" },
						this.props.slideObj.companyAddress
					),
					React.createElement(
						"div",
						{ className: "address" },
						this.props.slideObj.companyName
					),
					React.createElement(
						"div",
						{ className: "address" },
						this.props.slideObj.agentName
					),
					React.createElement(
						"div",
						{ className: "address" },
						this.props.slideObj.agentCompany
					),
					React.createElement(
						"div",
						{ className: "phone" },
						this.props.slideObj.agentPhoneNumber
					),
					React.createElement(
						"div",
						{ className: "copyright" },
						this.props.slideObj.rightsReserved
					),
					React.createElement(
						"a",
						{ target: "_blank", onClick: this.openPrivacyPolicyModal.bind(this), className: "btn" },
						this.props.slideObj.buttonText
					)
				)
			),
			React.createElement(
				"div",
				{ className: "mobilePrivacyPolicy mobile-only" },
				React.createElement(
					"div",
					{ className: "contactInfo" },
					React.createElement(
						"div",
						{ className: "address" },
						"1300 Manhattan Avenue Union City, NJ 07087"
					),
					React.createElement(
						"div",
						{ className: "address" },
						"Manhattan Avenue Capital 1300, LLC"
					),
					React.createElement("br", null),
					React.createElement(
						"div",
						{ className: "address" },
						"Richard Stabile"
					),
					React.createElement(
						"div",
						{ className: "address" },
						"RE/MAX Real Estate Limited"
					),
					React.createElement(
						"a",
						{ href: "tel:2014007487" },
						React.createElement(
							"div",
							{ className: "phone" },
							"201-400-7487"
						)
					),
					React.createElement("br", null),
					React.createElement(
						"div",
						{ className: "copyright" },
						"\xA9 2020 Hoboken Heights. All rights reserved."
					),
					React.createElement(
						"a",
						{ target: "_blank", onClick: this.openPrivacyPolicyModal.bind(this) },
						"Privacy Policy"
					)
				)
			)
		);
	}
}
module.exports = ContactFormSlide;

},{"./contactform.jsx":1}],3:[function(require,module,exports){
const modules = require('./modules.jsx');

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			phantomLogoActivated: false
		};
	}
	firstSlide() {
		const { scrollToFirstSlide } = this.props;
		scrollToFirstSlide();
	}
	activatePhantomLogo() {
		this.setState({ phantomLogoActivated: true });
	}
	deactivatePhantomLogo() {
		this.setState({ phantomLogoActivated: false });
	}
	render() {
		const slideHeaderState = this.props.options;
		const fixedHeader = slideHeaderState.fixedHeader;
		const addCornerLogo = slideHeaderState.addCornerLogo;
		if (!addCornerLogo) {
			return React.createElement('div', null);
		}
		const darkCornerLogo = slideHeaderState.addDarkCornerLogo;
		const animateCornerLogoOnStart = slideHeaderState.animateCornerLogoOnStart;
		const cornerLogoHideOnLastSlide = slideHeaderState.cornerLogoHideOnLastSlide;
		const cornerLogofadeIn = slideHeaderState.cornerLogofadeIn;

		let cornerLogoWrapperClasses = 'corner-logo-wrapper';
		if (darkCornerLogo) {
			cornerLogoWrapperClasses += ' darkMode';
		}
		if (animateCornerLogoOnStart) {
			cornerLogoWrapperClasses += ' animate';
		}
		if (fixedHeader) {
			cornerLogoWrapperClasses += ' fixed';
		}
		if (cornerLogoHideOnLastSlide) {
			cornerLogoWrapperClasses += ' cornerLogoHideOnLastSlide';
		}
		if (cornerLogofadeIn) {
			cornerLogoWrapperClasses += ' cornerLogofadeIn';
		}

		let phantomcornerLogoWrapperClasses = cornerLogoWrapperClasses + ' phantomcornerLogoWrapper';
		if (this.state.phantomLogoActivated) phantomcornerLogoWrapperClasses += ' activated';
		return React.createElement(
			'div',
			null,
			React.createElement(
				'div',
				{ className: cornerLogoWrapperClasses, onClick: this.firstSlide.bind(this) },
				React.createElement(
					'div',
					{ className: 'text' },
					modules.explodeString('HOBOKEN HEIGHTS'),
					React.createElement('div', { className: 'cascading-animation separator' })
				),
				darkCornerLogo && React.createElement('img', { className: 'corner-logo', src: '/assets/images/NIRMA_Logo_Symbol_Black.png' }),
				!darkCornerLogo && React.createElement('img', { className: 'corner-logo', src: '/assets/images/NIRMA_Logo_Symbol_White.png' })
			),
			this.props.hasPhantomLogo && React.createElement(
				'div',
				{ className: phantomcornerLogoWrapperClasses, onClick: this.firstSlide.bind(this) },
				React.createElement(
					'div',
					{ className: 'text' },
					modules.explodeString('HOBOKEN HEIGHTS'),
					React.createElement('div', { className: 'cascading-animation separator' })
				),
				darkCornerLogo && React.createElement('img', { className: 'corner-logo', src: '/assets/images/NIRMA_Logo_Symbol_Black.png' }),
				!darkCornerLogo && React.createElement('img', { className: 'corner-logo', src: '/assets/images/NIRMA_Logo_Symbol_White.png' })
			)
		);
	}
}

module.exports = Header;

},{"./modules.jsx":6}],4:[function(require,module,exports){
class LandingPageMusicPlayer extends React.Component {
	constructor(props) {
		super(props);
	}

	startMusicPlayer() {
		const { nextSlide } = this.props;
		const { playMusic } = this.props;
		playMusic();
		nextSlide();
	}

	stopMusicPlayer() {
		const { nextSlide } = this.props;
		const { muteMusic } = this.props;
		muteMusic();
		nextSlide();
	}

	animationHasEnded() {
		const { animationEnded } = this.props;
		animationEnded();
	}

	render() {
		let settingsClasses = 'settings slideInAnimationWrapper';
		let playButtonClasses = 'button play slideInAnimationElementContainer';
		let muteButtonClasses = 'button mute slideInAnimationElementContainer';

		if (this.props.isPlaying) {
			playButtonClasses += " selected_option";
		} else {
			muteButtonClasses += " selected_option";
		}

		return React.createElement(
			'div',
			{ className: settingsClasses },
			React.createElement(
				'div',
				{ className: playButtonClasses, onClick: this.startMusicPlayer.bind(this) },
				React.createElement(
					'div',
					{ className: 'text slideInAnimationElement slideInAnimationElementLeft' },
					this.props.slideData.sound_choice_start
				)
			),
			React.createElement('div', { className: 'separator' }),
			React.createElement(
				'div',
				{ onClick: this.stopMusicPlayer.bind(this), className: muteButtonClasses, onAnimationEnd: this.animationHasEnded.bind(this) },
				React.createElement(
					'div',
					{ className: 'text slideInAnimationElement slideInAnimationElementRight' },
					this.props.slideData.sound_choice_stop
				)
			)
		);
	}
}

module.exports = LandingPageMusicPlayer;

},{}],5:[function(require,module,exports){
class MobileMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mobileMenuOpen: 0
		};
	}

	lastSlide() {
		const { scrollToLastSlide } = this.props;
		scrollToLastSlide();
		this.closeMobileMenu();
	}
	toggleSound() {
		const { toggleMusic } = this.props;
		toggleMusic();
	}

	expandMobileMenu() {
		this.setState({ mobileMenuOpen: 1 });
	}
	closeMobileMenu() {
		this.setState({ mobileMenuOpen: 0 });
	}
	render() {
		let mobileMenuClasses = 'mobileMenu';
		let expandedMobileMenuClasses = 'expandedMobileMenu';
		let hamburgerClasses = 'hamburger';
		expandedMobileMenuClasses += this.state.mobileMenuOpen ? ' open' : '';
		hamburgerClasses += this.props.currIdx == 4 ? ' darkMode' : '';

		return React.createElement(
			'div',
			{ className: mobileMenuClasses },
			React.createElement(
				'div',
				{ className: 'hamburgerWrapper' },
				React.createElement(
					'div',
					{ className: hamburgerClasses, onClick: this.expandMobileMenu.bind(this) },
					React.createElement('div', { className: 'line' }),
					React.createElement('div', { className: 'line' })
				)
			),
			React.createElement(
				'div',
				{ className: expandedMobileMenuClasses },
				React.createElement(
					'div',
					{ className: 'menuItemsContainer' },
					React.createElement(
						'div',
						{ className: 'text' },
						'HOBOKEN HEIGHTS'
					),
					React.createElement('div', { className: 'separator' }),
					React.createElement(
						'div',
						{ className: 'logo' },
						React.createElement('img', { src: '/assets/images/NIRMA_Logo_Symbol_White.png', alt: '' })
					),
					React.createElement(
						'div',
						{ className: 'sound', onClick: this.toggleSound.bind(this) },
						this.props.isPlaying && React.createElement('img', { src: '/assets/images/mobile_sound_on.svg', alt: '' }),
						!this.props.isPlaying && React.createElement('img', { src: '/assets/images/mobile_sound_off.svg', alt: '' })
					),
					React.createElement(
						'div',
						{ className: 'contact', onClick: this.lastSlide.bind(this) },
						React.createElement('img', { src: '/assets/images/mobile_mail.svg', alt: '' })
					),
					React.createElement(
						'div',
						{ className: 'close_btn', onClick: this.closeMobileMenu.bind(this) },
						React.createElement('img', { src: '/assets/images/mobile_menu_x.svg', alt: '' })
					)
				)
			)
		);
	}
}

module.exports = MobileMenu;

},{}],6:[function(require,module,exports){
const modules = {
	explodeString: function (string) {
		const spans = string.split("").map(function (char, index) {
			return React.createElement(
				"span",
				{ className: "letter cascading-animation", key: index },
				char
			);
		});
		return spans;
	}
};

module.exports = modules;

},{}],7:[function(require,module,exports){
class MusicPlayer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cornerMusicPlayerAnimationFinished: 0
		};

		this.scrollToContactForm = this.scrollToContactForm.bind(this);
		this.cornerMusicPlayerAnimationEnded = this.cornerMusicPlayerAnimationEnded.bind(this);
		this.toggleMusic = this.toggleMusic.bind(this);
	}
	toggleMusic() {
		const { toggleMusicPlayer } = this.props;
		toggleMusicPlayer();
	}
	scrollToContactForm() {
		const { scrollToLastSlide } = this.props;
		scrollToLastSlide();
	}

	cornerMusicPlayerAnimationEnded() {
		this.setState({ cornerMusicPlayerAnimationFinished: 1 });
	}

	componentDidUpdate(prevProps) {
		if (prevProps.currIdx !== this.props.currIdx && this.props.currIdx == 1) {
			this.cornerMusicPlayerAnimationEnded();
		}
	}

	render() {
		let classes = "musicplayer_container";
		let corner_content_wrapper_classes = 'corner_content_wrapper';

		// if(this.props.isFirstSlide) {
		// 	classes += " center_layout";
		// }
		// else {
		// }
		classes += " corner_layout";

		if (this.props.darkMode) {
			classes += " darkMode";
		}

		if (!this.state.cornerMusicPlayerAnimationFinished && this.props.currIdx != 1) {
			corner_content_wrapper_classes += " animationHasNotRun";
		}

		const statusText = this.props.isPlaying ? 'ON' : 'OFF';

		return React.createElement(
			"div",
			{ className: classes },
			React.createElement(
				"div",
				{ className: corner_content_wrapper_classes },
				React.createElement(
					"div",
					{ className: "corner_content slideInAnimationWrapper" },
					React.createElement(
						"div",
						{ className: "button musicplayer slideInAnimationElementContainer", onClick: this.toggleMusic.bind(this) },
						React.createElement(
							"div",
							{ className: "slideInAnimationElement slideInAnimationElementLeft" },
							"SOUND",
							React.createElement("br", null),
							statusText
						)
					),
					React.createElement("div", { className: "separator" }),
					React.createElement(
						"div",
						{ className: "button slideInAnimationElementContainer", onClick: this.scrollToContactForm.bind(this) },
						React.createElement(
							"div",
							{ className: "text slideInAnimationElement slideInAnimationElementRight" },
							"CONTACT"
						)
					)
				)
			)
		);
	}
}

module.exports = MusicPlayer;

},{}],8:[function(require,module,exports){
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/*
 * These functions are used to fetch data from Wordpress's Advanced Custom Fields 
 * using the Wordpress REST API to be used with React
 * 
 * These functions require the Wordpress plugin ACF to REST API
 * https://github.com/airesvsg/acf-to-rest-api
 * 
 * Usage:
 * Require this file at the top of the main index.jsx file:
 * const flypilotFetchWPRestAPI = require('./assets/page.js');
 *
 * Within componentDidMount() execute the function:
 * flypilotFetchWPRestAPI(this)
 * 
 * By passing (this) in the above function, we will be able to set states using self
 * in our flypilotFetchWPRestAPI() and flypilotParseData() functions
 * 
 * In the plugin settings you will find information about the request version:
 * https://mywordpresssite.wpengine.com/wp-admin/options-permalink.php#acf-to-rest-api-settings
 * 
 * All the available endpoints are shown in the ACF to REST API github readme
 * 
 * You will need to set the ENDPOINT value to that which you desire.
 * For example:
 * const ENDPOINT = 'https://mysite.wpengine.com/wp-json/acf/v3/pages/';
 * 
 */

const ENDPOINT = 'https://nriahhlp.wpengine.com/wp-json/acf/v3/pages/';

/* 
 * flypilotFetchWPRestAPI()
 * This will receive the data from the endpoint. The data received should be used within flypilotParseData
 * You should not have to edit this function
 */
const flypilotFetchWPRestAPI = (() => {
	var _ref = _asyncToGenerator(function* (self) {
		const acf_page_response = yield fetch(ENDPOINT);
		const json = yield acf_page_response.json();
		const acf_data = json;
		flypilotParseData(self, acf_data);
	});

	return function flypilotFetchWPRestAPI(_x) {
		return _ref.apply(this, arguments);
	};
})();

/*
 * flypilotParseData()
 * You will need to edit the code within flypilotParseData brackets
 * 
 * The default function is simply:
 * const flypilotParseData = (self, acf_data) => {}
 * 
 * To set states you can use self:
 * self.setState({ myState:  acf_data.myProperty});
 * 
 * The data received will be in the acf_data variable:
 * myValue = acf_data.value
 * 
 */

const flypilotParseData = (self, acf_data) => {
	const page_data = acf_data[0].acf;
	const SLIDES = [{
		styles: {
			background: "#000"
		},
		video: page_data.background_video_hero,
		videoMobileStartPosition: 'center',
		isLandingPage: 1,
		soundTitle: page_data.sound,
		sound_choice_start: page_data.sound_choice,
		sound_choice_stop: page_data.no_choice,
		centerImage: page_data.logo_third, //used to replace video logo on Firefox mobile
		centerImageStyles: {
			width: "272px",
			marginBottom: "55px"
		},
		centerImageStylesMobile: {
			width: "180px",
			marginBottom: "40px"
		},
		centerTextClasses: "mobile-FF-only"
	}, {
		slideClasses: "fullWidthVideo",
		video: page_data.background_video_second,
		videoLoop: true,
		videoZoomEffect: true,
		videoMobileStartPosition: 'left',
		addCornerLogo: true,
		centerBottom: {
			line1: page_data.address,
			line2: page_data.coming_soon_text
		},
		hasDownArrow: true,
		downArrowImage: page_data.down_arrow,
		soundEffect: "./assets/sounds/SOUND-NIGHT_VIEW.mp3",
		phantomMusicPlayer: true,
		mobileHasDifferentContent: true,
		mobileContent: {
			left: {
				centerBottom: {
					line1: "SWIPE ",
					line1RightArrowBouncing: true,
					lineStyles: {
						display: 'flex',
						alignItems: 'center'
					}
				}
			},
			center: {
				centerBottom: {
					line1: page_data.address,
					line2: page_data.coming_soon_text
				}
			}
		},
		mobileHorizontalVideoSlideEnabled: true
	}, {
		slideClasses: "backgroundFrame",
		styles: {
			fontSize: '15px',
			lineHeight: '21px',
			overflowY: "auto",
			backgroundImage: "url(" + page_data.background_image + ")"
		},
		stylesMobile: {
			paddingTop: '63px',
			paddingBottom: '63px',
			alignItems: "flex-start"
		},
		enableScrolling: true,
		centerImage: page_data.logo_third,
		centerImageStyles: {
			width: "272px",
			marginBottom: "55px",
			cursor: "pointer"
		},
		centerImageStylesMobile: {
			width: "180px",
			marginBottom: "40px"
		},
		center: page_data.content_third,
		centerTagline: page_data.tagline_third,
		centerTextClasses: 'gotham-light',
		centerTextStyles: {
			width: "56vw"
		},
		centerTextStylesMobile: {
			width: "82vw"
		},

		contactButton: true,
		buttonText: page_data.button_text_third

		// background: "#000"
	}, {
		slideClasses: "fullWidthVideo",
		video: page_data.background_video_four,
		videoLoop: true,
		videoZoomEffect: true,
		videoMobileStartPosition: 'center',
		addCornerLogo: true,
		cornerLogoHideOnLastSlide: true,
		cornerLogofadeIn: true,
		soundEffect: "./assets/sounds/SOUND-SUNSET_VIEW.mp3",
		mobileHorizontalVideoSlideEnabled: true,
		mobileHasDifferentContent: true,

		mobileContent: {
			center: {
				centerBottom: {
					line1: " SWIPE ",
					line1RightArrowBouncing: true,
					line1LeftArrowBouncing: true,
					lineStyles: {
						display: 'flex',
						alignItems: 'center'
					}
				}
			}
		}
	}, {
		// slideClasses: "fullWidthVideo",
		// video: page_data.background_video_four,
		// videoLoop: true,
		// videoZoomEffect: true,
		// videoMobileStartPosition: 'center',

		styles: {
			// background: "rgb(21 22 23)",
			fontSize: '15px',
			lineHeight: '21px',
			overflowY: "auto"
			// backgroundImage: "url("+page_data.background_image_fifth_slide+")",
			// backgroundSize: 'contain',
			// backgroundPosition: 'bottom left',
		},
		enableScrolling: true,
		addCornerLogo: true,
		cornerLogoHideOnLastSlide: true,
		cornerLogofadeIn: true,
		// soundEffect: "./assets/sounds/SOUND-SUNSET_VIEW.mp3",
		// mobileHorizontalVideoSlideEnabled: true,
		mobileHasDifferentContent: true,
		founderHeadline: page_data.headline_fifth,
		founderTagline: page_data.tagline_fifth,
		founderBenefits: page_data.founder_benefits,
		founderImage: page_data.background_image_fifth_slide,
		mobileContent: {
			center: {
				centerBottom: {
					line1: " SWIPE ",
					line1RightArrowBouncing: true,
					line1LeftArrowBouncing: true,
					lineStyles: {
						display: 'flex',
						alignItems: 'center'
					}
				}
			}
		}

	}, {
		styles: {
			backgroundColor: "transparent",
			color: "#000",
			overflow: "auto"
		},
		// addCornerLogo: true,
		addDarkCornerLogo: true,
		// animateCornerLogoOnStart: true,
		contactFormSlide: true,
		enableScrolling: true,
		contactLogo: page_data.contact_logo,
		companyAddress: page_data.company_address,
		companyName: page_data.company_name,
		agentName: page_data.agent_name,
		agentPhoneNumber: page_data.agent_phone_number,
		rightsReserved: page_data.rights_reserved,
		buttonText: page_data.button_text_fifth,
		buttonLink: page_data.button_link_fifth
	}];

	self.setState({ slides: SLIDES });
};

module.exports = flypilotFetchWPRestAPI;

},{}],9:[function(require,module,exports){
const modules = require('./modules.jsx');

class PrivacyPolicy extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {

		return React.createElement(
			"div",
			{ className: "privacyPolicyContainer" },
			React.createElement(
				"div",
				{ className: "heading" },
				"We value your privacy. By using our website, you agree that you have read and understand the following policy. Should you have any questions, please feel free to reach out to us via our Contact page or at info@nria.net"
			),
			React.createElement("hr", null),
			React.createElement(
				"h2",
				{ className: "title" },
				"Privacy policy"
			),
			React.createElement(
				"p",
				null,
				"This is the privacy notice of:"
			),
			React.createElement(
				"p",
				null,
				"National Realty Investment Advisors, LLC"
			),
			React.createElement(
				"p",
				null,
				"1325 Paterson Plank Road, 2nd Floor"
			),
			React.createElement(
				"p",
				null,
				"Secaucus, New Jersey 07094"
			),
			React.createElement(
				"p",
				null,
				"In this document, \u201Cwe\u201D, \u201Cour\u201D, or \u201Cus\u201D refer to National Realty Investment Advisors, LLC"
			),
			React.createElement(
				"p",
				null,
				"Introduction"
			),
			React.createElement(
				"p",
				null,
				"This is a notice to inform you of our policy about all information that we record about you. It sets out the conditions under which we may process any information that we collect from you, or that you provide to us. It covers information that could identify you (\u201Cpersonal information\u201D) and information that could not. In the context of the law and this notice, \u201Cprocess\u201D means collect, store, transfer, use or otherwise act on information."
			),
			React.createElement(
				"p",
				null,
				"We regret that if there are one or more points below with which you are not happy, your only recourse is to leave our website immediately."
			),
			React.createElement(
				"p",
				null,
				"We take seriously the protection of your privacy and confidentiality. We understand that all visitors to our website are entitled to know that their personal data will not be used for any purpose unintended by them, and will not accidentally fall into the hands of a third party."
			),
			React.createElement(
				"p",
				null,
				"We undertake to preserve the confidentiality of all information you provide to us, and hope that you reciprocate."
			),
			React.createElement(
				"p",
				null,
				"Our policy complies with United States law accordingly implemented, as well as that required by the EU General Data Protection Regulation (GDPR)."
			),
			React.createElement(
				"p",
				null,
				"The law requires us to tell you about your rights and our obligations to you in regards to the processing and control of your personal data. We do this now, by requesting that you read the information provided at www.knowyourprivacyrights.org"
			),
			React.createElement(
				"p",
				null,
				"Except as set out below, we do not share, or sell, or disclose to a third party, any information collected through our website."
			),
			React.createElement(
				"p",
				null,
				"The bases on which we process information about you"
			),
			React.createElement(
				"p",
				null,
				"The GDPR law requires us to determine under which of six defined bases we process different categories of your personal information, and to notify you of the basis for each category."
			),
			React.createElement(
				"p",
				null,
				"If a basis on which we process your personal information is no longer relevant then we shall immediately stop processing your data."
			),
			React.createElement(
				"p",
				null,
				"If the basis changes then if required by law we shall notify you of the change and of any new basis under which we have determined that we can continue to process your information."
			),
			React.createElement(
				"p",
				null,
				"1. Information we process because we have a contractual obligation with you"
			),
			React.createElement(
				"p",
				null,
				"When you create an account on our website, buy a product or service from us, or otherwise agree to our terms and conditions, a contract is formed between you and us."
			),
			React.createElement(
				"p",
				null,
				"In order to carry out our obligations under that contract we must process the information you give us. Some of this information may be personal information."
			),
			React.createElement(
				"p",
				null,
				"We may use it in order to:"
			),
			React.createElement(
				"p",
				null,
				"1.1. verify your identity for security purposes"
			),
			React.createElement(
				"p",
				null,
				"1.2. sell products to you"
			),
			React.createElement(
				"p",
				null,
				"1.3. provide you with our services"
			),
			React.createElement(
				"p",
				null,
				"1.4. provide you with suggestions and advice on products, services and how to obtain the most from using our website"
			),
			React.createElement(
				"p",
				null,
				"We process this information on the basis there is a contract between us, or that you have requested we use the information before we enter into a legal contract."
			),
			React.createElement(
				"p",
				null,
				"Additionally, we may aggregate this information in a general way and use it to provide class information, for example to monitor our performance with respect to a particular service we provide. If we use it for this purpose, you as an individual will not be personally identifiable."
			),
			React.createElement(
				"p",
				null,
				"We shall continue to process this information until the contract between us ends or is terminated by either party under the terms of the contract."
			),
			React.createElement(
				"p",
				null,
				"2. Information we process with your consent"
			),
			React.createElement(
				"p",
				null,
				"Through certain actions when otherwise there is no contractual relationship between us, such as when you browse our website or ask us to provide you more information about our business, including job opportunities and our products and services, you provide your consent to us to process information that may be personal information."
			),
			React.createElement(
				"p",
				null,
				"Wherever possible, we aim to obtain your explicit consent to process this information, for example, by asking you to agree to our use of cookies."
			),
			React.createElement(
				"p",
				null,
				"Sometimes you might give your consent implicitly, such as when you send us a message by e-mail to which you would reasonably expect us to reply."
			),
			React.createElement(
				"p",
				null,
				"Except where you have consented to our use of your information for a specific purpose, we do not use your information in any way that would identify you personally. We may aggregate it in a general way and use it to provide class information, for example to monitor the performance of a particular page on our website."
			),
			React.createElement(
				"p",
				null,
				"We do not sell your personal information to any third party."
			),
			React.createElement(
				"p",
				null,
				"We continue to process your information on this basis until you withdraw your consent or it can be reasonably assumed that your consent no longer exists."
			),
			React.createElement(
				"p",
				null,
				"You may withdraw your consent at any time by instructing us at info@nria.net. However, if you do so, you may not be able to use our website or our services further."
			),
			React.createElement(
				"p",
				null,
				"3. Information we process for the purposes of legitimate interests"
			),
			React.createElement(
				"p",
				null,
				"We may process information on the basis there is a legitimate interest, either to you or to us, of doing so."
			),
			React.createElement(
				"p",
				null,
				"Where we process your information on this basis, we do after having given careful consideration to:"
			),
			React.createElement(
				"p",
				null,
				"whether the same objective could be achieved through other means"
			),
			React.createElement(
				"p",
				null,
				"whether processing (or not processing) might cause you harm"
			),
			React.createElement(
				"p",
				null,
				"whether you would expect us to process your data, and whether you would, in the round, consider it reasonable to do so"
			),
			React.createElement(
				"p",
				null,
				"For example, we may process your data on this basis for the purposes of:"
			),
			React.createElement(
				"p",
				null,
				"record-keeping for the proper and necessary administration of our business"
			),
			React.createElement(
				"p",
				null,
				"responding to unsolicited communication from you to which we believe you would expect a response"
			),
			React.createElement(
				"p",
				null,
				"protecting and asserting the legal rights of any party"
			),
			React.createElement(
				"p",
				null,
				"insuring against or obtaining professional advice that is required to manage our business risk"
			),
			React.createElement(
				"p",
				null,
				"protecting your interests where we believe we have a duty to do so"
			),
			React.createElement(
				"p",
				null,
				"4. Information we process because we have a legal obligation"
			),
			React.createElement(
				"p",
				null,
				"We are subject to the law like everyone else. Sometimes, we must process your information in order to comply with a statutory obligation."
			),
			React.createElement(
				"p",
				null,
				"For example, we may be required to give information to legal authorities if they so request or if they have the proper authorization such as a search warrant or court order."
			),
			React.createElement(
				"p",
				null,
				"This may include your personal information."
			),
			React.createElement(
				"p",
				null,
				"Specific Uses Of Information You Provide To Us"
			),
			React.createElement(
				"p",
				null,
				"5. Information relating to your method of payment"
			),
			React.createElement(
				"p",
				null,
				"While we do keep records of past purchases, including the last 4 digits of any credit card used to make a purchase from us, we do not store your complete payment information on our own servers. All of our payments are processed securely through Stripe."
			),
			React.createElement(
				"p",
				null,
				"6. Job application and employment"
			),
			React.createElement(
				"p",
				null,
				"If you send us information in connection with a job application, we may keep it in case we decide to contact you at a later date."
			),
			React.createElement(
				"p",
				null,
				"If we employ you, we collect information about you and your work from time to time throughout the period of your employment. This information will be used only for purposes directly relevant to your employment. After your employment has ended, we may keep your file for our records unless you specifically ask us to destroy it by emailing us your request at info@nria.net. Upon receiving this request, we may seek legal counsel before complying, and we may or may not grant your request, depending on the advice that we receive from our lawyers."
			),
			React.createElement(
				"p",
				null,
				"7. Sending a message to our support team"
			),
			React.createElement(
				"p",
				null,
				"When you contact us, whether by telephone, through our website or by e-mail, we collect the data you have given to us in order to reply with the information you need."
			),
			React.createElement(
				"p",
				null,
				"We record your request and our reply in order to increase the efficiency of our business."
			),
			React.createElement(
				"p",
				null,
				"We may keep personally identifiable information associated with your message, such as your name and email address so as to be able to track our communications with you to provide a high quality service. We do not share this information with any outside party."
			),
			React.createElement(
				"p",
				null,
				"8. Complaining"
			),
			React.createElement(
				"p",
				null,
				"When we receive a complaint, we record all the information you have given to us."
			),
			React.createElement(
				"p",
				null,
				"We use that information to resolve your complaint."
			),
			React.createElement(
				"p",
				null,
				"If your complaint reasonably requires us to contact some other person, we may decide to give to that other person some of the information contained in your complaint. We do this as infrequently as possible, but it is a matter for our sole discretion as to whether we do give information, and if we do, what that information is."
			),
			React.createElement(
				"p",
				null,
				"We may also compile statistics showing information obtained from this source to assess the level of service we provide, but not in a way that could identify you or any other person."
			),
			React.createElement(
				"p",
				null,
				"Use Of Information We Collect Through Automated Systems When You Visit Our Website"
			),
			React.createElement(
				"p",
				null,
				"9. Cookies"
			),
			React.createElement(
				"p",
				null,
				"Our website uses cookies. They are placed by software that operates on our servers, and by software operated by third parties whose services we use."
			),
			React.createElement(
				"p",
				null,
				"Your web browser should allow you to delete any you choose. It also should allow you to prevent or limit their use. You can also use services such as Ghostery to block them altogether."
			),
			React.createElement(
				"p",
				null,
				"When you first visit our website, we ask you whether you wish us to use cookies. If you choose not to use cookies or you prevent their use through your browser settings, you will not be able to use all the functionality of our website."
			),
			React.createElement(
				"p",
				null,
				"We use cookies in the following ways:"
			),
			React.createElement(
				"p",
				null,
				"9.1. to track how you use our website"
			),
			React.createElement(
				"p",
				null,
				"9.2. to record whether you have seen specific messages we display on our website"
			),
			React.createElement(
				"p",
				null,
				"9.3. to record your answers to surveys and questionnaires on our site while you complete them"
			),
			React.createElement(
				"p",
				null,
				"10. Personal identifiers from your browsing activity"
			),
			React.createElement(
				"p",
				null,
				"Requests by your web browser to our servers for web pages and other content on our website are recorded."
			),
			React.createElement(
				"p",
				null,
				"We record information such as your geographical location, your Internet service provider and your IP address. We also record information about the software you are using to browse our website, such as the type of computer or device and the screen resolution."
			),
			React.createElement(
				"p",
				null,
				"We use this information in aggregate to assess the popularity of the webpages on our website and how we perform in providing content to you."
			),
			React.createElement(
				"p",
				null,
				"If combined with other information we know about you from previous visits, the data possibly could be used to identify you personally, even if you are not signed in to our website."
			),
			React.createElement(
				"p",
				null,
				"11. Our use of re-marketing"
			),
			React.createElement(
				"p",
				null,
				"Re-marketing involves placing a cookie on your computer when you browse our website in order to be able to serve to you an advert for our products or services when you visit some other website."
			),
			React.createElement(
				"p",
				null,
				"We may use a third party to provide us with re-marketing services from time to time. If so, then if you have consented to our use of cookies, you may see advertisements for our products and services on other websites."
			),
			React.createElement(
				"p",
				null,
				"Disclosure and sharing of your information"
			),
			React.createElement(
				"p",
				null,
				"12. Information we obtain from third parties"
			),
			React.createElement(
				"p",
				null,
				"Although we do not disclose your personal information to any third party (except as set out in this notice), we sometimes receive data that is indirectly made up from your personal information from third parties whose services we use."
			),
			React.createElement(
				"p",
				null,
				"p No such information is personally identifiable to you."
			),
			React.createElement(
				"p",
				null,
				"p 13. Data may be processed outside the European Union"
			),
			React.createElement(
				"p",
				null,
				"Our websites are hosted in the United States."
			),
			React.createElement(
				"p",
				null,
				"We may also use outsourced services in countries outside the European Union from time to time in other aspects of our business."
			),
			React.createElement(
				"p",
				null,
				"Accordingly data obtained within the UK or any other country could be processed outside the European Union."
			),
			React.createElement(
				"p",
				null,
				"Access to your own information"
			),
			React.createElement(
				"p",
				null,
				"14. Access to your personal information"
			),
			React.createElement(
				"p",
				null,
				"14.1. To obtain a copy of any information that we may be holding about you, you may send us a request at info@nria.net"
			),
			React.createElement(
				"p",
				null,
				"14.2. After receiving the request, we will inform you whether or not we do indeed have the information you are requesting, and we will tell you when we expect to provide you with the information."
			),
			React.createElement(
				"p",
				null,
				"15. Removal of your information"
			),
			React.createElement(
				"p",
				null,
				"If you wish us to remove personally identifiable information from our website, you may contact us at info@nria.net"
			),
			React.createElement(
				"p",
				null,
				"This may limit the service we can provide to you."
			),
			React.createElement(
				"p",
				null,
				"16. Verification of your information"
			),
			React.createElement(
				"p",
				null,
				"When we receive any request to access, edit or delete personal identifiable information we shall first take reasonable steps to verify your identity before granting you access or otherwise taking any action. This is important to safeguard your information."
			),
			React.createElement(
				"p",
				null,
				"Other matters"
			),
			React.createElement(
				"p",
				null,
				"17. Use of site by children"
			),
			React.createElement(
				"p",
				null,
				"17.1. We do not sell products or provide services for purchase by children, nor do we market to children."
			),
			React.createElement(
				"p",
				null,
				"17.2. If you are under 18, you may use our website only with consent from a parent or guardian"
			),
			React.createElement(
				"p",
				null,
				"17.3. We collect data about all users of and visitors to these areas regardless of age, and we anticipate that some of those users and visitors will be children."
			),
			React.createElement(
				"p",
				null,
				"17.4. Such child users and visitors will inevitably visit other parts of the site and will be subject to whatever on-site marketing they find, wherever they visit."
			),
			React.createElement(
				"p",
				null,
				"18. Encryption of data sent between us"
			),
			React.createElement(
				"p",
				null,
				"We use Secure Sockets Layer (SSL) certificates to verify our identity to your browser and to encrypt any data you give us."
			),
			React.createElement(
				"p",
				null,
				"Whenever information is transferred between us, you can check that it is done so using SSL by looking for a closed padlock symbol or other trust mark in your browser\u2019s URL bar or toolbar."
			),
			React.createElement(
				"p",
				null,
				"19. How you can complain"
			),
			React.createElement(
				"p",
				null,
				"19.1. If you are not happy with our privacy policy or if have any complaint then you should tell us by email. Our address is info@nria.net"
			),
			React.createElement(
				"p",
				null,
				"19.2. If a dispute is not settled then we hope you will agree to attempt to resolve it by engaging in good faith with us in a process of mediation or arbitration."
			),
			React.createElement(
				"p",
				null,
				"19.3. If you are in any way dissatisfied about how we process your personal information, you have a right to lodge a complaint with the Information Commissioner\u2019s Office or equivalent officials in your country."
			),
			React.createElement(
				"p",
				null,
				"20. Retention period for personal data"
			),
			React.createElement(
				"p",
				null,
				"Except as otherwise mentioned in this privacy notice, we keep your personal information only for as long as required by us:"
			),
			React.createElement(
				"p",
				null,
				"20.1. to provide you with the services you have requested;"
			),
			React.createElement(
				"p",
				null,
				"20.2. to comply with other law, including for the period demanded by our tax authorities;"
			),
			React.createElement(
				"p",
				null,
				"20.3. to support a claim or defense in court."
			),
			React.createElement(
				"p",
				null,
				"21. Compliance with the law"
			),
			React.createElement(
				"p",
				null,
				"Our privacy policy has been compiled so as to comply with the law of every country or legal jurisdiction in which we aim to do business. If you think it fails to satisfy the law of your jurisdiction, we should like to hear from you."
			),
			React.createElement(
				"p",
				null,
				"However, ultimately it is your choice as to whether you wish to use our website."
			),
			React.createElement(
				"p",
				null,
				"22. Review of this privacy policy"
			),
			React.createElement(
				"p",
				null,
				"We may update this privacy notice from time to time as necessary. The terms that apply to you are those posted here on our website on the day you use our website. We advise you to print a copy for your records."
			),
			React.createElement(
				"p",
				null,
				"If you have any question regarding our privacy policy, please contact us at info@nria.net"
			)
		);
	}
}

module.exports = PrivacyPolicy;

},{"./modules.jsx":6}],10:[function(require,module,exports){
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const ContactFormSlide = require('./contactformslide.jsx');
const Header = require('./header.jsx');
const LandingPageMusicPlayer = require('./landingpagemusicplayer.jsx');
const MusicPlayer = require('./musicplayer.jsx');

class Slide extends React.Component {
	constructor(props) {
		super(props);

		this.handleLangChange = e => {
			let element = e.target;
			const scrolled = element.scrollTop > 0 ? true : false;
			this.props.onSlideScroll(scrolled);
		};

		this.state = {
			styles: this.props.obj.styles,
			landingPageAnimationFinished: 0,
			soundEffect: new Audio()
		};
		this.landingPageAnimationEnded = this.landingPageAnimationEnded.bind(this);

		this.musicPlay = this.musicPlay.bind(this);
		this.musicMute = this.musicMute.bind(this);
		this.scrollToNextSlide = this.scrollToNextSlide.bind(this);

		this.state.soundEffect.loop = true;

		if (this.state.styles) {
			this.state.styles.backgroundRepeat = "no-repeat";
		}
	}

	musicMute() {
		const { stopMusic } = this.props;
		stopMusic();
	}

	musicPlay(evt) {
		const { playMusic } = this.props;
		playMusic();
	}

	landingPageAnimationEnded() {
		this.setState({ landingPageAnimationFinished: 1 });
	}

	scrollToContactForm() {
		const { scrollToLastSlide } = this.props;
		scrollToLastSlide();
	}
	scrollToTop() {
		const { scrollToFirstSlide } = this.props;
		scrollToFirstSlide();
	}

	scrollToNextSlide() {
		const { goToNextSlide } = this.props;
		goToNextSlide();
	}

	slideHorizontal(direction) {
		this.props.horizontalSlide(direction);
	}

	playSoundEffect() {
		const soundEffect = this.props.obj.soundEffect;
		const musicIsPlaying = this.props.isPlaying;
		const isCurrent = this.props.isCurrent;
		if (isCurrent && musicIsPlaying && soundEffect) {
			const updateSoundSource = this.state.soundEffect.src.indexOf(soundEffect.substring(1)) == -1;
			const soundIsPaused = this.state.soundEffect.paused;
			if (updateSoundSource) {
				this.state.soundEffect.src = soundEffect;
			}
			if (soundIsPaused) {
				this.state.soundEffect.play();
			}
		} else this.state.soundEffect.pause();
	}

	contactFormSubmitted() {
		const { formSubmitted } = this.props;
		formSubmitted();
	}

	contactFormCleared() {
		const { formCleared } = this.props;
		formCleared();
	}
	createHubspotForm() {
		const { createHubspotContactForm } = this.props;
		createHubspotContactForm();
	}

	openPrivacyPolicyModal() {
		const { showPrivacyPolicy } = this.props;
		showPrivacyPolicy();
	}
	render() {
		this.playSoundEffect();

		const slideObj = this.props.obj;

		let slideClasses = "slide";
		let videoClasses = 'background-video';
		let landing_page_sound_player_classes = 'landing_page_sound_player';
		let centerTextClasses = 'center';
		let centerBottomClasses = "centerBottom";

		const isCurrent = this.props.isCurrent;
		const headerOptions = {
			addCornerLogo: slideObj.addCornerLogo,
			addDarkCornerLogo: slideObj.addDarkCornerLogo,
			animateCornerLogoOnStart: slideObj.animateCornerLogoOnStart,
			cornerLogoHideOnLastSlide: slideObj.cornerLogoHideOnLastSlide,
			cornerLogofadeIn: slideObj.cornerLogofadeIn
		};

		slideClasses += slideObj.slideClasses != undefined ? " " + slideObj.slideClasses : '';
		if (isCurrent) slideClasses += " runAnimations activeSlide";
		if (this.props.slideViewed) slideClasses += " runAnimationOnce";
		if (slideObj.videoZoomEffect) videoClasses += ' videoZoomEffect';
		slideClasses += slideObj.videoMobileStartPosition ? ' mobile-video-position-' + slideObj.videoMobileStartPosition : ' mobile-video-position-left';
		slideClasses += slideObj.contactFormSlide ? ' contactFormSlide' : '';
		slideClasses += slideObj.founderHeadline ? ' founderSlide' : '';

		// if(!this.state.landingPageAnimationFinished) {
		// 	landing_page_sound_player_classes += " animationHasNotRun";
		// }

		if (slideObj.centerTextClasses) {
			centerTextClasses += ' ' + slideObj.centerTextClasses;
		}

		if (slideObj.mobileHasDifferentContent) {
			centerTextClasses += ' not-mobile';
			centerBottomClasses += ' not-mobile';
		}

		let centerTextStyles;
		let slideStyles;
		if (window.innerWidth > 768) {
			centerTextStyles = slideObj.centerTextStyles;
			slideStyles = this.state.styles;
		} else {
			centerTextStyles = slideObj.centerTextStylesMobile;
			slideStyles = _extends({}, this.state.styles, slideObj.stylesMobile);
		}

		let centerImageStyles;
		if (window.innerWidth > 768) {
			centerImageStyles = slideObj.centerImageStyles;
		} else {
			centerImageStyles = slideObj.centerImageStylesMobile;
		}

		let right_arrow_bouncing = React.createElement('div', { className: 'right_arrow_bouncing', onClick: () => this.slideHorizontal('right') });
		let left_arrow_bouncing = React.createElement('div', { className: 'left_arrow_bouncing', onClick: () => this.slideHorizontal('left') });

		const disableVideo = slideObj.isLandingPage && this.props.isFirefoxAndroid ? true : false; //This will be used because videos do not autoplay on FF mobile
		return React.createElement(
			'div',
			{ className: slideClasses, style: slideStyles, onScroll: this.handleLangChange },
			React.createElement(Header, { options: headerOptions, scrollToFirstSlide: this.scrollToTop.bind(this) }),
			slideObj.phantomMusicPlayer &&
			// This music player should only appear on the second slide to create the visual effect of it sliding down and up with the second slide.
			// The regular music player is fixed in the right top corner
			React.createElement(MusicPlayer, { currIdx: this.props.currIdx, toggleMusicPlayer: this.musicToggle, goToNextSlide: this.scrollToNextSlide, scrollToLastSlide: this.scrollToContactForm, isPlaying: this.props.isPlaying }),
			slideObj.video && !disableVideo &&
			//Hide landingpage video on FFMobile because it will not autoplay
			//Video is set this way because react does not set muted to true which is required by some devices to allow autoplay
			React.createElement('div', {
				className: 'videoContainer',
				dangerouslySetInnerHTML: {
					__html: `
							<video
							class="${videoClasses}"
							${slideObj.videoLoop ? 'loop="true"' : ''}
							muted='muted'
							autoplay='true'
							playsinline='playsinline'
							preload="metadata"
							>
							<source src="${slideObj.video}" type="video/mp4" />
							</video>`
				}
			}),
			slideObj.contactFormSlide && React.createElement(ContactFormSlide, { scrollToFirstSlide: this.scrollToTop.bind(this), slideObj: slideObj, createHubspotContactForm: this.createHubspotForm.bind(this), formCleared: this.contactFormCleared.bind(this), formSubmitted: this.contactFormSubmitted.bind(this), showPrivacyPolicy: this.openPrivacyPolicyModal.bind(this) }),
			React.createElement(
				'div',
				{ className: centerTextClasses, style: centerTextStyles },
				slideObj.centerImage && React.createElement('img', { onClick: this.scrollToTop.bind(this), style: centerImageStyles, src: slideObj.centerImage }),
				slideObj.centerTagline && React.createElement(
					'p',
					{ className: 'centerTagline' },
					slideObj.centerTagline
				),
				React.createElement('div', { className: 'centerContent', dangerouslySetInnerHTML: { __html: slideObj.center } }),
				slideObj.contactButton && React.createElement(
					'div',
					{ className: 'btn contactButton', onClick: this.scrollToContactForm.bind(this) },
					slideObj.buttonText
				)
			),
			slideObj.founderHeadline && React.createElement(
				'div',
				{ className: 'founderSlideContainer' },
				React.createElement('img', { className: 'founderImage', src: slideObj.founderImage, alt: '' }),
				React.createElement(
					'div',
					{ className: 'founderSlideWrapper' },
					slideObj.founderHeadline && React.createElement(
						'p',
						{ className: 'founderHeadline' },
						slideObj.founderHeadline
					),
					slideObj.founderTagline && React.createElement(
						'p',
						{ className: 'founderTagline' },
						slideObj.founderTagline
					),
					slideObj.founderBenefits && React.createElement(
						'div',
						{ className: 'founderBenefits' },
						Object.entries(slideObj.founderBenefits).map(([key, value]) => {
							return React.createElement(
								'div',
								{ key: key, className: 'benefitPair' },
								React.createElement(
									'div',
									{ className: 'count' },
									parseInt(key) + 1
								),
								React.createElement(
									'div',
									{ className: 'benefit' },
									value.benefit
								)
							);
						})
					)
				)
			),
			React.createElement(
				'div',
				{ className: centerBottomClasses },
				slideObj.isLandingPage && React.createElement(
					'div',
					{ className: 'musicplayer_container center_layout' },
					React.createElement(
						'div',
						{ className: 'musicplayer centered_content' },
						React.createElement(
							'div',
							{ className: landing_page_sound_player_classes },
							React.createElement(
								'div',
								{ className: 'title' },
								slideObj.soundTitle
							),
							React.createElement(LandingPageMusicPlayer, { slideData: slideObj, animationEnded: this.landingPageAnimationEnded, nextSlide: this.scrollToNextSlide, muteMusic: this.musicMute, playMusic: this.musicPlay, isPlaying: this.props.isPlaying })
						)
					)
				),
				slideObj.centerBottom && slideObj.centerBottom.line1 && React.createElement('h1', { dangerouslySetInnerHTML: { __html: slideObj.centerBottom.line1 } }),
				slideObj.centerBottom && slideObj.centerBottom.line2 && React.createElement('h1', { dangerouslySetInnerHTML: { __html: slideObj.centerBottom.line2 } }),
				slideObj.hasDownArrow && React.createElement('img', { onClick: this.scrollToNextSlide.bind(this), className: 'downArrow', src: slideObj.downArrowImage })
			),
			slideObj.mobileHasDifferentContent && slideObj.mobileContent.center && React.createElement(
				'div',
				{ className: "centerBottom mobile-only mobile-content-center " + (isCurrent && slideObj.videoMobileStartPosition == 'center' ? ' animate' : '') },
				React.createElement(
					'h1',
					{ style: slideObj.mobileContent.center.centerBottom.lineStyles, className: 'line' },
					slideObj.mobileContent.center.centerBottom.line1LeftArrowBouncing && left_arrow_bouncing,
					React.createElement('div', { dangerouslySetInnerHTML: { __html: slideObj.mobileContent.center.centerBottom.line1 } }),
					slideObj.mobileContent.center.centerBottom.line1RightArrowBouncing && right_arrow_bouncing
				),
				React.createElement('h1', { style: slideObj.mobileContent.center.centerBottom.lineStyles, className: 'line', dangerouslySetInnerHTML: { __html: slideObj.mobileContent.center.centerBottom.line2 } })
			),
			slideObj.mobileHasDifferentContent && slideObj.mobileContent.left && React.createElement(
				'div',
				{ className: "centerBottom mobile-only mobile-content-left " + (isCurrent && slideObj.videoMobileStartPosition == 'left' ? ' animate' : '') },
				React.createElement(
					'h1',
					{ style: slideObj.mobileContent.left.centerBottom.lineStyles, className: 'line' },
					React.createElement('div', { dangerouslySetInnerHTML: { __html: slideObj.mobileContent.left.centerBottom.line1 } }),
					slideObj.mobileContent.left.centerBottom.line1RightArrowBouncing && right_arrow_bouncing
				)
			)
		);
	}
}

module.exports = Slide;

},{"./contactformslide.jsx":2,"./header.jsx":3,"./landingpagemusicplayer.jsx":4,"./musicplayer.jsx":7}],11:[function(require,module,exports){
'use strict';

const flypilotFetchWPRestAPI = require('./assets/page.js');
const Slide = require('./assets/slide.jsx');
const MusicPlayer = require('./assets/musicplayer.jsx');
const modules = require('./assets/modules.jsx');
const Header = require('./assets/header.jsx');
const PrivacyPolicy = require('./assets/privacypolicy.jsx');
const MobileMenu = require('./assets/mobilemenu.jsx');

class SplashPage extends React.Component {
	constructor(props) {
		super(props);

		this.handleSlideScroll = hasScrolled => {
			this.setState({ slideHasScrolled: hasScrolled });
		};

		this.privacyPolicyModalTransitionEnd = e => {
			if (e.propertyName !== "opacity" || this.state.privacyPolicyFadeType === "in") return;

			if (this.state.privacyPolicyFadeType === "out") {
				this.privacyPolicyModalRemove();
			}
		};

		this.state = {
			slides: [{}],
			slidesViewed: [0],
			transitiongState: 0, // 0 for false -1 for up 1 for down
			currIdx: 0,
			previousScrollVal: 0,
			peakScrollVal: 0,
			readyForScroll: 1,
			browser: '',
			operating_sys: '',
			isiPhone: '',
			touchState: 0, //0 for end, 1 for start, 2 for move
			touchDirection: null,
			touchStartCoordinate: {
				x: null,
				y: null
			},

			isPlaying: false,
			audioPlayer: new Audio('./assets/sounds/SOUND-GENERAL_MUSIC.mp3'),
			inputFocusOutEvent: null,
			scrollDebouncer: null,
			slideHasScrolled: null,
			privacyPolicyEnabled: false,
			videosPlayed: null
		};
		this.watchForEventEnd = this.watchForEventEnd.bind(this);
		this.firstSlide = this.firstSlide.bind(this);
		this.lastSlide = this.lastSlide.bind(this);
		this.nextSlide = this.nextSlide.bind(this);
		this.handleTouchStart = this.handleTouchStart.bind(this);

		this.throttleOnScroll = _.throttle(this.throttleOnScroll.bind(this), 100, { leading: true });
		// this.debounceOnScroll = _.throttle(this.debounceOnScroll.bind(this), 3500, {leading: true, trailing:true});


		this.musicMute = this.musicMute.bind(this);
		this.musicPlay = this.musicPlay.bind(this);
		this.musicToggle = this.musicToggle.bind(this);

		/*
   * Browser wheel event inconsistencies
   * 
   * Chrome - outputs many consecutive events that start with deltaY of 1/-1 and can 
   * go into the hundreds depending on how quickly you tried to scroll. 
   * Even the smallest consistent scroll can output multiple events of deltaY = 1/-1
   * A new deltaY event can be created every hundreth of a second. A single scroll can output
   * hundreds of deltaY events.
   * 
   * Safari - usually only outputs a single wheel event whether the scroll is long and slow or big and quick
   * The deltaY will be 1 or -1. In some cases when the scroll is very quick, deltaY events are created in a manner similar to Chrome
   * 
   * Firefox on Mac is similar to Chrome
   * 
   * Firefox on Windows is a mix of both Chrome's and Safari's style
   * With small quick scrolls, only a single event is output
   * With long slow scrolls, a new deltaY event is created about every second
   * With quick big scrolls, many events are created from deltaY of 3 to about 30, 
   * sometimes every few ms, but it doesnt create nearly as many events as Chrome. A single scroll can output
   * dozens of deltaY events
   *
   * Opera scrolls in increments of 100. A normal scroll will execute 20-30 deltaY values of 100. 
   * A hard scroll executes a strange output. An example would be:
   * values of 100x6 200x1 100x6 300x1 100x10 all for a single scroll 
   * 
  */
		let browser;
		const user_agent = navigator.userAgent.toLowerCase();
		if (user_agent.indexOf('windows') != -1) {
			this.state.operating_sys = 'windows';
		} else if (navigator.userAgent.indexOf('OPR') != -1 || navigator.userAgent.indexOf('Opera') != -1) {
			this.state.operating_sys = 'opera';
		} else if (user_agent.indexOf('android') != -1) {
			this.state.operating_sys = 'android';
		} else if (user_agent.indexOf('macintosh') != -1) {
			this.state.operating_sys = 'macintosh';
		}

		if (user_agent.indexOf('safari') != -1) {
			if (user_agent.indexOf('chrome') > -1) {
				browser = 'chrome';
			} else {
				browser = 'safari';
			}
		} else if (user_agent.indexOf('firefox') != -1) {
			browser = 'firefox';
		}
		this.state.browser = browser;

		this.mobileMenuElement = React.createRef();
		this.headerElement = React.createRef();

		this.state.isiPhone = navigator.platform == "iPhone";
	}
	componentDidMount() {
		flypilotFetchWPRestAPI(this);

		window.addEventListener('keydown', event => {
			if (!event.target.classList.contains('input')) {
				if (event.code == "ArrowUp") this.prevSlide();else if (event.code == "ArrowDown") this.nextSlide();else if (event.code == "ArrowLeft") this.prevSlide();else if (event.code == "ArrowRight") this.nextSlide();
			}
		});

		//See handleResizeOnAndroid() for details
		if (this.state.operating_sys == 'android') {
			this.timerHandle = null;
			window.addEventListener('resize', () => this.handleResizeOnAndroid());
		}
	}

	/*
  * handleResizeOnAndroid() is used due to android soft keyboards changing the 
  * viewport height which causes the page to suddenly shift.
  * 
  * The resize event is sometimes triggered twice from a single focusOut
  * event from the .input element. The resizeTime should be large enough to
  * last long enough for the second event to occur before the timeout is cleared.
  * 
  * The animation stopper will run if a text input is active because it is 
  * is the reason a keyboard would appear
  * 
  * It will also run if a text input has recently had an event of focusout because
  * we dont want to have animations as the keyboard hides itself
  */

	handleResizeOnAndroid() {
		const resizeTime = 1500;
		const inputIsActive = $(document.activeElement).hasClass('hs-input');
		if (inputIsActive || this.state.inputFocusOutEvent) {
			this.setState({ inputFocusOutEvent: false });
			document.body.classList.add("resize-animation-stopper");
			clearTimeout(this.timerHandle);
			this.timerHandle = setTimeout(() => {
				document.body.classList.remove("resize-animation-stopper");
			}, resizeTime);
		}
	}
	componentDidUpdate() {
		const that = this;
		return;
		// this.refs.inner.addEventListener('transitionend', (evt) => {
		// 	that.setState({
		// 		transitiongState: 0,
		// 		currIdx: (this.state.currIdx + delta)
		// 	});
		// }, false);
	}
	// debounceOnScroll() {
	// 	//very long scrolls last 3.5 seconds, should be safe to zero out the scroll at that point
	// 	//this would create a more responsive experience since a deltaY of 1 would then trigger a slide

	// 	this.setState({previousScrollVal: 0});
	// }

	musicMute(evt) {
		this.setState({ isPlaying: false });
	}
	musicPlay(evt) {
		this.setState({ isPlaying: true });
	}
	musicToggle() {
		this.setState({ isPlaying: !this.state.isPlaying });
	}
	scrollSlide(deltaY) {
		const isScrollingDown = deltaY > 0;
		if (isScrollingDown) {
			this.nextSlide();
		} else {
			this.prevSlide();
		}
	}

	/*
  * This function is used because on Firefox Android the videos will not autoplay
  * This function is executed at the end of every touch event and will continue to 
  * execute each touch event until Firefox allows the user to play the video.
  * Firefox will not allow the video to play until a tap event occurs - not a touchdrag.
  */
	playVideos() {
		let self = this;
		if (this.state.videosPlayed) return;
		const allVideos = document.querySelectorAll('.background-video');
		allVideos.forEach(function (video) {
			const playPromise = video.play();
			if (playPromise !== undefined) {
				playPromise.then(function () {
					self.setState({ videosPlayed: true });
				}).catch(function (error) {
					console.log('play failed', error);
				});
			}
		});
	}

	/*
  * enableScroll()
  * Some browsers have the smallest deltaY above 0 at 100 and will never go to 0. This is problematic because
  * if a single deltaY of 100 is triggered, the first scroll will run, but then after a few moments if a second
  * deltaY of 100 is triggered, we need a way to enable the scroll feature between the two events to make sure
  * the second event triggers a scroll.
  * This can run on browsers that don't have this issue without complication.
  */
	enableScroll() {
		this.setState({
			readyForScroll: true,
			previousScrollVal: 0
		});
		this.scrollDebouncer = null;
	}
	throttleOnScroll(deltaY) {
		if (this.scrollDebouncer != null) {
			clearTimeout(this.scrollDebouncer);
		}
		this.scrollDebouncer = setTimeout(this.enableScroll.bind(this), 500);
		if (Math.abs(deltaY) >= 1 && this.state.readyForScroll) {
			if (Math.abs(deltaY) > Math.abs(this.state.previousScrollVal)) {
				this.scrollSlide(deltaY);
				this.setState({ peakScrollVal: deltaY });
				this.setState({ readyForScroll: null });
			}
		} else {
			if (Math.abs(this.state.peakScrollVal) / 2 >= Math.abs(deltaY)) {
				this.setState({ readyForScroll: true });
			} else if (Math.abs(deltaY) > Math.abs(this.state.peakScrollVal)) {
				this.setState({ peakScrollVal: deltaY });
			}
		}

		this.setState({ previousScrollVal: deltaY });
	}
	handleScrollEvent(evt) {
		const deltaY = evt.deltaY;
		// this.throttleOnScroll(deltaY);
		// this.debounceOnScroll(deltaY);
		return;
		// const isScrollingDown = deltaY > 0;
		// if (isScrollingDown) {
		// 	this.nextSlide();
		// } else {
		// 	this.prevSlide();
		// }
	}
	handleWheelEvent(evt) {
		const deltaY = evt.deltaY;
		// const browserWithSingleScrollEvent = this.state.browser == 'safari' || (this.state.browser == 'firefox' && this.state.operating_sys != 'macintosh');
		// if(browserWithSingleScrollEvent) {
		// 	this.scrollSlide(deltaY)
		// }
		// else {
		// 	this.throttleOnScroll(deltaY);
		// }
		this.throttleOnScroll(deltaY);
		// this.debounceOnScroll(deltaY);
		return;
		// const isScrollingDown = deltaY > 0;
		// if (isScrollingDown) {
		// 	this.nextSlide();
		// } else {
		// 	this.prevSlide();
		// }
	}
	watchForEventEnd(e) {
		//The onTransitionEnd event triggers many properties and not only for .slides_inner . We only want to run this function for the transform property
		const isSlidesInner = e.target.classList.contains('slides_inner');
		if (!isSlidesInner) {
			return;
		}

		// const transitionProperty = e.propertyName
		// if(transitionProperty != 'transform') return;
		this.setState({ transitiongState: 0 });
	}
	isTransitioning() {
		return this.state.transitiongState != 0 || this.state.touchState == 2;
	}
	addIdxToViewedSlides(idx) {
		if (this.state.slidesViewed.includes(idx)) return;

		let slidesViewedArray = this.state.slidesViewed.concat(idx);
		this.setState({ slidesViewed: slidesViewedArray });
	}

	//animationsStopped is used to prevent animation issues with the android keyboard appearing when dealing with form inputs
	animationsStopped() {
		const isStopped = document.body.classList.contains("resize-animation-stopper");
		return isStopped;
	}
	nextSlide() {
		const isFirefoxAndroid = this.state.browser == 'firefox' && this.state.operating_sys == 'android';
		const videosPlayed = this.state.videosPlayed;
		if (this.isTransitioning() || this.animationsStopped() || isFirefoxAndroid && !videosPlayed) {
			return;
		}
		if (this.state.slides[this.state.currIdx].enableScrolling) {
			const scrollBottom = document.querySelector('.activeSlide').scrollHeight - document.querySelector('.activeSlide').offsetHeight - document.querySelector('.activeSlide').scrollTop;
			if (scrollBottom > 0) {
				//scrollBottom can be negative
				return;
			}
		}
		const newIdx = this.state.currIdx + 1;
		if (newIdx >= this.state.slides.length) {
			return;
		}
		this.setState({
			transitiongState: 1,
			currIdx: newIdx
		});
		this.handleSlideChange(newIdx);
	}
	prevSlide() {
		if (this.isTransitioning() || this.animationsStopped()) {
			return;
		}
		const positionIsNotAtTopOfSlide = document.querySelector('.activeSlide').scrollTop != 0;
		if (positionIsNotAtTopOfSlide) {
			return;
		}
		const newIdx = this.state.currIdx - 1;
		if (newIdx < 0) {
			return;
		}
		this.setState({
			transitiongState: -1,
			currIdx: newIdx
		});
		this.handleSlideChange(newIdx);
	}
	firstSlide() {
		const newIdx = 0;
		const alreadyOnFirstSlide = this.state.currIdx == newIdx;

		if (this.isTransitioning() || alreadyOnFirstSlide) {
			return;
		}
		this.setState({
			transitiongState: 1,
			currIdx: newIdx
		});
		this.handleSlideChange(newIdx);
	}
	lastSlide() {
		const newIdx = this.state.slides.length - 1;
		const alreadyOnLastSlide = this.state.currIdx == newIdx;

		if (this.isTransitioning() || alreadyOnLastSlide) {
			return;
		}
		if (newIdx < 0) {
			return;
		}
		this.setState({
			transitiongState: 1,
			currIdx: newIdx
		});
		this.handleSlideChange(newIdx);
	}

	handleSlideChange(newIdx) {
		this.addIdxToViewedSlides(newIdx);
		const isLastSlide = newIdx == this.state.slides.length - 1;
		this.mobileMenuElement.current.closeMobileMenu();
		const notOnLastSlide = this.state.currIdx != this.state.slides.length - 1;
		if (isLastSlide) this.headerElement.current.activatePhantomLogo();else this.headerElement.current.deactivatePhantomLogo();
	}
	handleTouchStart(evt) {
		const coordinateX = evt.touches[0].clientX;
		const coordinateY = evt.touches[0].clientY;
		const coordinateObj = {
			x: coordinateX,
			y: coordinateY
		};
		this.setState({
			touchState: 1,
			touchStartCoordinate: coordinateObj
		});
	}
	handleTouchMove(evt) {
		if (this.state.touchState != 1) return;
		const coordinateX = evt.touches[0].clientX;
		const coordinateY = evt.touches[0].clientY;
		const horizontalDirection = this.state.touchStartCoordinate.x > coordinateX ? 'right' : 'left';
		const verticalDirection = this.state.touchStartCoordinate.y > coordinateY ? 'down' : 'up';
		const horizontalDifference = Math.abs(this.state.touchStartCoordinate.x - coordinateX);
		const verticalDifference = Math.abs(this.state.touchStartCoordinate.y - coordinateY);

		let mainTouchDirection;
		if (verticalDifference > horizontalDifference) {
			mainTouchDirection = verticalDirection;
		} else {
			mainTouchDirection = horizontalDirection;
		}

		this.setState({
			touchState: 2,
			touchDirection: mainTouchDirection
		});
		if (mainTouchDirection == 'up') {} else if (mainTouchDirection == 'down') {
			this.nextSlide();
		}
		switch (mainTouchDirection) {
			case 'up':
				this.prevSlide();
				break;
			case 'down':
				this.nextSlide();
				break;
			case 'left':
				this.slideHorizontal('left');
				break;
			case 'right':
				this.slideHorizontal('right');
				break;
		}
	}
	handleTouchEnd() {
		this.playVideos();
		this.setState({
			touchState: 0
		});

		jQuery("html, body").animate({ scrollTop: 0 }); //possible fix to hide address bar on iPhone when body is > 100vh
	}
	slideHorizontal(direction) {
		const key = this.state.currIdx;
		const mobileHorizontalVideoSlideEnabled = this.state.slides[key].mobileHorizontalVideoSlideEnabled;
		if (!mobileHorizontalVideoSlideEnabled) return;

		const videoMobileStartPosition = this.state.slides[key].videoMobileStartPosition;
		let newVideoMobileStartPosition;

		if (direction == 'right') {
			if (videoMobileStartPosition == 'left') newVideoMobileStartPosition = 'center';else if (videoMobileStartPosition == 'center') newVideoMobileStartPosition = 'right';else return;
		} else {
			if (videoMobileStartPosition == 'right') newVideoMobileStartPosition = 'center';else if (videoMobileStartPosition == 'center') newVideoMobileStartPosition = 'left';else return;
		}

		const slidesStateCopy = this.state.slides;
		slidesStateCopy[key].videoMobileStartPosition = newVideoMobileStartPosition;
		this.setState({ slides: slidesStateCopy });
	}
	contactFormSubmitted() {
		this.setState({ formSubmitted: true });
	}
	contactFormCleared() {
		this.setState({ formSubmitted: null });
		$('#page').removeClass('formSubmitted');
		$('.contactPageWrapper .contactForm').outerHeight('auto');
	}

	createHubspotForm() {
		let self = this;
		const recaptcha_branding = `<div class='recaptcha_branding'>This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy">Privacy Policy</a> and <a href="https://policies.google.com/terms">Terms of Service</a> apply.</div>`;
		hbspt.forms.create({
			portalId: "5163160",
			formId: "4c41114a-2807-4884-b5e9-d6b49d56d217",
			target: '#hubspotFormWrapper',
			onFormSubmit: function ($form) {
				$('#page').addClass('formSubmitted');
				const formHeight = $('.contactPageWrapper .contactForm').outerHeight();
				$('.contactPageWrapper .contactForm').outerHeight(formHeight);
			},
			onFormReady: function () {
				$("#hubspotFormWrapper .form-columns-0").append(recaptcha_branding);

				$(".hs-input").on('focusout', function () {
					self.setState({ inputFocusOutEvent: true });
				});
			},
			onFormSubmitted: function () {
				self.createHubspotForm();
			}
		});
	}

	privacyPolicyModalOpen() {
		this.setState({ privacyPolicyEnabled: true });
		setTimeout(() => this.setState({ privacyPolicyFadeType: "in" }), 0);
	}
	privacyPolicyModalRemove() {
		this.setState({
			privacyPolicyEnabled: false,
			privacyPolicyFadeType: null
		});
	}
	privacyPolicyModalFadeOut() {
		this.setState({ privacyPolicyFadeType: 'out' });
	}

	render() {
		if (this.state.isPlaying) {
			this.state.audioPlayer.play();
		} else {
			this.state.audioPlayer.pause();
		}

		const isFirefoxAndroid = this.state.browser == 'firefox' && this.state.operating_sys == 'android';

		const $slides = this.state.slides.map((slide, idx) => React.createElement(Slide, { isFirefoxAndroid: isFirefoxAndroid, showPrivacyPolicy: this.privacyPolicyModalOpen.bind(this), horizontalSlide: this.slideHorizontal.bind(this), onSlideScroll: this.handleSlideScroll, scrollToFirstSlide: this.firstSlide, createHubspotContactForm: this.createHubspotForm.bind(this), formCleared: this.contactFormCleared.bind(this), formSubmitted: this.contactFormSubmitted.bind(this), currIdx: this.state.currIdx, playMusic: this.musicPlay, stopMusic: this.musicMute, slideViewed: this.state.slidesViewed.includes(idx), goToNextSlide: this.nextSlide, scrollToLastSlide: this.lastSlide, key: idx, obj: slide, isCurrent: idx == this.state.currIdx, isPlaying: this.state.isPlaying }));
		const innerStyle = {
			transform: 'translateY(-' + this.state.currIdx * 100 + 'vh)'
		};

		const thisSlideState = this.state.slides[this.state.currIdx];
		const thisSlideSoundEffect = thisSlideState.soundEffect;
		const addCornerLogo = thisSlideState.addCornerLogo;
		const darkCornerLogo = thisSlideState.addDarkCornerLogo;
		const animateCornerLogoOnStart = thisSlideState.animateCornerLogoOnStart;
		const lastSlideIdx = this.state.slides.length - 1;
		const lastSlideViewed = this.state.slidesViewed.includes(lastSlideIdx);

		let headerOptions = {
			addCornerLogo: true,
			addDarkCornerLogo: true,
			fixedHeader: true
		};

		if (this.state.currIdx == lastSlideIdx) {
			headerOptions.animateCornerLogoOnStart = true;
		}
		let slides_inner_classes = "slides_inner slide_idx_" + this.state.currIdx;

		let pageClasses = this.state.formSubmitted ? 'formSubmitted' : '';
		pageClasses += this.state.isiPhone ? ' iPhone' : '';
		pageClasses += isFirefoxAndroid ? ' firefoxAndroid' : '';
		let slidesWrapperClasses = "slides_wrapper";
		if (this.state.slideHasScrolled) slidesWrapperClasses += ' scrolled';

		let privacyPolicyClasses = 'privacyPolicyModal';
		if (this.state.privacyPolicyFadeType == 'out') {
			privacyPolicyClasses += ' fade-out';
		} else if (this.state.privacyPolicyFadeType == 'in') {
			privacyPolicyClasses += ' fade-in';
		}

		return React.createElement(
			'div',
			{ id: 'page', className: pageClasses },
			this.state.privacyPolicyEnabled && React.createElement(
				'div',
				{ className: privacyPolicyClasses, onTransitionEnd: this.privacyPolicyModalTransitionEnd, onClick: this.privacyPolicyModalFadeOut.bind(this) },
				React.createElement(PrivacyPolicy, null)
			),
			React.createElement(
				'div',
				{ className: 'submittedFormOverlay mobile-only' },
				React.createElement(
					'div',
					{ className: 'text' },
					'THANK YOU!'
				),
				React.createElement(
					'div',
					{ className: 'closeBtn', onClick: this.contactFormCleared.bind(this) },
					React.createElement('img', { src: '/assets/images/form_close_btn.svg' })
				)
			),
			React.createElement(
				'div',
				{ className: slidesWrapperClasses, onTouchStart: this.handleTouchStart.bind(this), onTouchMove: this.handleTouchMove.bind(this), onTouchEnd: this.handleTouchEnd.bind(this), onWheel: this.handleWheelEvent.bind(this), onScroll: this.handleScrollEvent.bind(this) },
				React.createElement(Header, { hasPhantomLogo: true, ref: this.headerElement, currIdx: this.state.currIdx, options: headerOptions, scrollToFirstSlide: this.firstSlide }),
				React.createElement(
					'div',
					{
						ref: 'inner',
						className: slides_inner_classes,
						style: innerStyle,
						onTransitionEnd: e => this.watchForEventEnd(e) },
					$slides
				),
				React.createElement(MusicPlayer, { toggleMusicPlayer: this.musicToggle, soundEffect: thisSlideSoundEffect, darkMode: darkCornerLogo, goToNextSlide: this.nextSlide, scrollToLastSlide: this.lastSlide, isFirstSlide: this.state.currIdx === 0, currIdx: this.state.currIdx, isPlaying: this.state.isPlaying }),
				React.createElement(MobileMenu, { ref: this.mobileMenuElement, currIdx: this.state.currIdx, scrollToLastSlide: this.lastSlide, isPlaying: this.state.isPlaying, toggleMusic: this.musicToggle })
			)
		);
	}
}

let domContainer = document.querySelector('#container');
ReactDOM.render(React.createElement(SplashPage, null), domContainer);

},{"./assets/header.jsx":3,"./assets/mobilemenu.jsx":5,"./assets/modules.jsx":6,"./assets/musicplayer.jsx":7,"./assets/page.js":8,"./assets/privacypolicy.jsx":9,"./assets/slide.jsx":10}]},{},[11]);
