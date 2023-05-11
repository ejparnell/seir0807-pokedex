const BattleTeam = require('../models/battle-team')

function index(req, res, next) {
	BattleTeam.find({ user: req.user._id })
		.then((battleTeams) => {
			res.render('battle-teams/index', {
				battleTeams,
				title: 'My Battle Teams',
			})
		})
		.catch(next)
}

function newBattleTeam(req, res) {
	res.render('battle-teams/new', { title: 'New Battle Team' })
}

function create(req, res, next) {
	req.body.user = req.user._id
	BattleTeam.create(req.body)
		.then(() => res.redirect('/battle-teams'))
		.catch(next)
}

function show(req, res, next) {
	BattleTeam.findById(req.params.id)
		.then((battleTeam) => {
			res.render('battle-teams/show', {
				battleTeam,
				title: 'Battle Team Details',
			})
		})
		.catch(next)
}

function deleteBattleTeam(req, res, next) {
	BattleTeam.findById(req.params.id)
		.then((battleTeam) => {
			if (!battleTeam.user.equals(req.user._id)) throw new Error('Unauthorized')
			return battleTeam.deleteOne()
		})
		.then(() => res.redirect('/battle-teams'))
		.catch(next)
}

function updateBattleTeamForm(req, res, next) {
	BattleTeam.findById(req.params.id)
		.then((battleTeam) => {
			res.render('battle-teams/edit', {
				battleTeam,
				title: 'Battle Team Details',
			})
		})
		.catch(next)
}

function update(req, res, next) {
	BattleTeam.findById(req.params.id)
		.then((battleTeam) => {
			if (!battleTeam.user.equals(req.user._id)) throw new Error('Unauthorized')
			return battleTeam.updateOne(req.body)
		})
		.then(() => res.redirect(`/battle-teams/${req.params.id}`))
		.catch(next)
}

module.exports = {
	index,
	create,
	show,
	update,
	newBattleTeam,
	deleteBattleTeam,
	updateBattleTeamForm,
}
