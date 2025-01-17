import React from 'react'
import { CardProfile } from './CardProfile'
import { FB_FS_SENSHI_BADGES_ONLINE } from 'constantValues'

const CardProfileOptioned = props => {
	return <CardProfile {...props} />
}

const CardProfilePropedIndex = props => {
	return <CardProfileOptioned badge={[FB_FS_SENSHI_BADGES_ONLINE]} {...props} />
}

const CardProfilePropedSearch = props => {
	return <CardProfileOptioned {...props} />
}

export { CardProfilePropedIndex, CardProfilePropedSearch }
