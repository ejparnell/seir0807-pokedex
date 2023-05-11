const mongoose = require('mongoose')
const pokemonSchema = require('./pokemon')

const battleTeamSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		pokemon: [pokemonSchema],
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('BattleTeam', battleTeamSchema)