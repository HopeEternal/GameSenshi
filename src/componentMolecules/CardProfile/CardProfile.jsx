import React, { useState, useCallback, useRef } from 'react'
import { Card, CardBody, Row, Col } from 'reactstrap'
import styles from './styles.module.css'
import classnames from 'classnames'
import Image from 'material-ui-image'
import { Exports } from 'componentAtoms'
import { stopUndefined } from 'utils'

const { ButtonSoundPropedGender, BadgesOptioned } = stopUndefined(Exports)

const CardProfile = props => {
	const [hover, setHover] = useState(false)
	const [leave, setLeave] = useState(false)
	const { name, src, badge, gender, audioSrc, price, description } = props

	const onMouseEnter = useCallback(() => {
		setHover(true)
	}, [])

	const onMouseLeave = useCallback(() => {
		setLeave(true)
		setTimeout(() => {
			setHover(false)
			setLeave(false)
		}, 500)
	}, [])

	return (
		<Col xs='6' lg='3' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
			<Card className='card-profile mt-0'>
				<div
					className={classnames('card-image', styles.clear, {
						[styles.zoomIn]: hover,
						[styles.zoomOut]: leave,
					})}
				>
					<Row className='w-100 position-absolute mt-3' style={{ zIndex: 2 }}>
						<Col className='px-0' align='right'>
							<BadgesOptioned badges={badge} className='m-0' />
						</Col>
					</Row>
					<Image
						alt={name}
						className='img img-raised rounded'
						color='transparent' //this is needed or else there is tiny white background even when OTHER image in carousel move, very weird behavior
						src={src}
					/>
				</div>
				<CardBody>
					<Row className='align-items-center'>
						<Col>
							<h4
								className={classnames(
									'title my-0 font-weight-bold text-nowrap text-white'
								)}
								align='left'
							>
								{name}
							</h4>
						</Col>
					</Row>
					<Row className='align-items-center my-1'>
						<Col>
							<ButtonSoundPropedGender gender={gender} url={audioSrc} />
						</Col>
						<Col>
							<h4
								align='right'
								className={classnames(
									'title my-0 text-white text-nowrap',
									styles.goldenYellow
								)}
							>
								${price}
							</h4>
						</Col>
					</Row>
					<Row>
						<Col>
							<p align='left' className='text-white text-nowrap'>
								{description}
							</p>
						</Col>
					</Row>
				</CardBody>
			</Card>
		</Col>
	)
}

export { CardProfile }
