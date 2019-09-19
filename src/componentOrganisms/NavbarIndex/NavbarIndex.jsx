import React from 'react'
import { stopUndefined } from 'utils'
import { ExportCompounds } from 'componentnCompounds'
// state
import {
	storeUser,
	storeAlert,
	Subscribe,
	STORE_ALERT_STATE_OPEN,
	STATE,
	STORE_USER_STATE_SIGNED_IN,
} from 'state'
// reactstrap components
import {
	Collapse,
	Navbar,
	NavItem,
	NavLink,
	Nav,
	Container,
	Row,
	Col,
} from 'reactstrap'
// constants
import { ROUTE_PAGE_SIGN_UP, ROUTE_PAGE_SIGN_IN } from 'routes'

const widthBreakPoint = 991
const bgPurple = 'bg-purple'

const {
	BrandNavbarPropedIndexNavbarStoreUser,
	ProgressCommonStoreProgress,
	AlertCommonStoreAlert,
	ButtonSignInStoreUserPropedIndexNavbar,
	ButtonSignUpStoreUserPropedIndexNavbar,
	LoaderSmallPropedIndexNavbarStoreUser,
	IconNotificationStoreUserPropedIndexNavbar,
	ListNavItemStoreUserPropedNavbarIndex,
	MenuHamburger,
	HeaderCollapsedPropedNavbarIndex,
	DropdownMenuNavbarStoreUserPropedNavbarIndex,
	AvatarUserStoreUser,
	Link,
	DropdownNavbarStoreUser,
	ListNavItemStoreUserPropedCollpased,
} = stopUndefined(ExportCompounds)

class NavbarIndex extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			collapseOpen: false,
			color: 'navbar-transparent',
			overWidthBreakPoint: window.innerWidth > widthBreakPoint,
			collapseExited: true,
			navbarHeight: 0,
		}
		this.setState = this.setState.bind(this)
	}
	componentDidMount() {
		window.addEventListener('scroll', this.changeColor)
		window.addEventListener('resize', this.onDimensionChange)
	}
	componentWillUnmount() {
		window.removeEventListener('scroll', this.changeColor)
		window.removeEventListener('resize', this.onDimensionChange)
	}

	onDimensionChange = () => {
		if (
			window.innerWidth > widthBreakPoint &&
			!this.state.overWidthBreakPoint
		) {
			this.setState({ overWidthBreakPoint: true })
		} else if (
			window.innerWidth <= widthBreakPoint &&
			this.state.overWidthBreakPoint
		) {
			this.setState({ overWidthBreakPoint: false })
		}
	}

	changeColor = () => {
		if (
			document.documentElement.scrollTop > 299 ||
			document.body.scrollTop > 299
		) {
			this.setState({
				color: bgPurple,
			})
		} else if (
			document.documentElement.scrollTop < 300 ||
			document.body.scrollTop < 300
		) {
			this.setState({
				color:
					(storeAlert[STATE][STORE_ALERT_STATE_OPEN] && bgPurple) ||
					'navbar-transparent',
			})
		}
	}

	toggleCollapse = () => {
		document.documentElement.classList.toggle('nav-open')
		this.setState(state => {
			state.collapseOpen = !state.collapseOpen
			return state
		})
	}
	onCollapseEntering = () => {
		this.setState({
			collapseExited: false,
		})
	}
	onCollapseExiting = () => {
		this.setState({
			collapseOut: 'collapsing-out',
		})
	}
	onCollapseExited = () => {
		this.setState({
			collapseOut: '',
			collapseExited: true,
		})
	}
	scrollToDownload = () => {
		document
			.getElementById('download-section')
			.scrollIntoView({ behavior: 'smooth' })
	}

	render() {
		const {
			props: {
				location: { pathname },
			},
			state: { color, collapseOpen, collapseOut, overWidthBreakPoint },
			toggleCollapse,
			onCollapseExiting,
			onCollapseExited,
			onCollapseEntering,
			collapseExited,
		} = this

		const currentPath = pathname.toLowerCase()
		return (
			<Subscribe to={[storeUser, storeAlert]}>
				{(storeUser, storeAlert) => {
					const { [STORE_USER_STATE_SIGNED_IN]: isSignedIn } = storeUser.state
					const { [STORE_ALERT_STATE_OPEN]: alertOpen } = storeAlert.state
					return (
						<div className='fixed-top'>
							<ProgressCommonStoreProgress />
							<Navbar
								style={{
									zIndex: 90000,
								}}
								className={(alertOpen && bgPurple) || color}
								color-on-scroll='100'
								expand='lg'>
								<Container>
									<div className='navbar-translate'>
										{/*small screen size*/}
										<BrandNavbarPropedIndexNavbarStoreUser />
										<Nav className='flex-row' navbar>
											<LoaderSmallPropedIndexNavbarStoreUser small>
												<IconNotificationStoreUserPropedIndexNavbar small />
												<ButtonSignUpStoreUserPropedIndexNavbar small />
												<ButtonSignInStoreUserPropedIndexNavbar small />
											</LoaderSmallPropedIndexNavbarStoreUser>
											<MenuHamburger
												isOpen={collapseOpen}
												toggle={toggleCollapse}
											/>
										</Nav>
									</div>
									<Collapse
										className={'justify-content-end ' + collapseOut}
										style={{
											overflow: collapseOpen ? 'hidden' : 'visible',
										}}
										navbar
										isOpen={collapseOpen}
										onEntering={onCollapseEntering}
										onExiting={onCollapseExiting}
										onExited={onCollapseExited}>
										<HeaderCollapsedPropedNavbarIndex
											isOpen={collapseOpen}
											toggle={toggleCollapse}
										/>
										<Nav navbar>
											{(!collapseOpen && collapseExited) ||
											overWidthBreakPoint ? (
												<LoaderSmallPropedIndexNavbarStoreUser>
													{/* big screen size or not collapsed*/}
													<ListNavItemStoreUserPropedNavbarIndex />
													<IconNotificationStoreUserPropedIndexNavbar className='d-none d-lg-inline-flex' />
													<DropdownNavbarStoreUser
														avatar={
															<AvatarUserStoreUser height={36} width={36} />
														}
														menu={
															<DropdownMenuNavbarStoreUserPropedNavbarIndex />
														}
													/>
													<ButtonSignInStoreUserPropedIndexNavbar />
													<ButtonSignUpStoreUserPropedIndexNavbar />
												</LoaderSmallPropedIndexNavbarStoreUser>
											) : // small screen size and collapsed
											isSignedIn ? (
												<ListNavItemStoreUserPropedCollpased />
											) : (
												<>
													{currentPath !== '/signin' && (
														<NavItem className='p-0'>
															<NavLink
																data-placement='bottom'
																to={ROUTE_PAGE_SIGN_IN}
																tag={Link}>
																<Row>
																	<Col xs='2'>
																		<i className='fab fas fa-sign-in-alt' />
																	</Col>
																	<Col>
																		<p>Sign in</p>
																	</Col>
																</Row>
															</NavLink>
														</NavItem>
													)}
													{currentPath !== '/signup' && (
														<NavItem className='p-0'>
															<NavLink
																data-placement='bottom'
																to={ROUTE_PAGE_SIGN_UP}
																tag={Link}>
																<Row>
																	<Col xs='2'>
																		<i className='fab fas fa-user-plus' />
																	</Col>
																	<Col>
																		<p>Sign up</p>
																	</Col>
																</Row>
															</NavLink>
														</NavItem>
													)}
												</>
											)}
										</Nav>
									</Collapse>
								</Container>
							</Navbar>
							<AlertCommonStoreAlert />
						</div>
					)
				}}
			</Subscribe>
		)
	}
}

export { NavbarIndex }