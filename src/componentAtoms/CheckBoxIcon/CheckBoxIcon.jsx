import React, { useState, useEffect, useCallback } from 'react'
import { Button, Tooltip } from 'reactstrap'
import classnames from 'classnames'

const CheckBoxIcon = props => {
	const { color, icon, onClick, checked, tooltipOn, tooltipOff } = props
	const [checked_, setChecked_] = useState(checked)
	const [showTooltip, setShowTooltip] = useState(false)
	const [tooltipMount, setTooltipMount] = useState(true)
	const id = icon.replace(/ /g, '')

	const onClick_ = useCallback(
		e => {
			onClick && onClick(e, setChecked_)
			if (tooltipOff) {
				// if tooltip off is not provided, this is not treated as checkbox
				setChecked_(!checked_)
				// unmount tooltip upon click
				setTooltipMount(false)
			}
		},
		[onClick, checked_]
	)

	useEffect(() => {
		// this is needed to remount tooltip so that it display text correctly after click
		if (!tooltipMount) {
			setTooltipMount(true)
		}
	}, [tooltipMount])

	useEffect(() => {
		// this is needed when parent component rerender
		setChecked_(checked)
	}, [checked])

	const onMouseEnter = useCallback(() => {
		setShowTooltip(true)
	}, [])

	const onMouseLeave = useCallback(() => {
		setShowTooltip(false)
	}, [])

	return (
		<>
			<Button
				className={classnames(
					{ 'btn-simple': !checked_ },
					'btn-icon btn-round ml-1'
				)}
				color={color}
				type='button'
				onClick={onClick_}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				id={id}>
				<i className={icon} />
			</Button>
			{tooltipMount && (
				<Tooltip delay={100} target={id} isOpen={showTooltip} placement='top'>
					{checked_
						? tooltipOff
							? tooltipOn
							: tooltipOff
						: tooltipOff
						? tooltipOff
						: tooltipOn}
				</Tooltip>
			)}
		</>
	)
}

export { CheckBoxIcon }
