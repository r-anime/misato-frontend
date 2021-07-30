import Vue from 'vue';
import Vuex from 'vuex';
import { getDiscordInfo, getGuildChannels, getGuildRoles } from './util/requests';

Vue.use(Vuex);

// Promises used to track whether or not something is already being fetched
let fetchDiscordInfoPromise = null;
let fetchGuildRolesPromise = null;
let fetchGuildChannelsPromise = null;
let fetchEmojisPromise = null;

export default new Vuex.Store({
	state: {
		discordInfo: undefined,
		guildRoles: {},
		guildChannels: {},
		emojis: null,
	},
	mutations: {
		SET_DISCORD_INFO (state, info) {
			state.discordInfo = info;
		},
		SET_GUILD_ROLES (state, {guildID, roles}) {
			Vue.set(state.guildRoles, guildID, roles);
		},
		SET_GUILD_CHANNELS (state, {guildID, channels}) {
			Vue.set(state.guildChannels, guildID, channels);
		},
		SET_EMOJIS (state, emojis) {
			state.emojis = emojis;
		},
	},
	actions: {
		fetchDiscordInfo ({commit}) {
			if (!fetchDiscordInfoPromise) {
				fetchDiscordInfoPromise = getDiscordInfo().then(async response => {
					commit('SET_DISCORD_INFO', response.ok ? await response.json().catch(() => null) : null);
					fetchDiscordInfoPromise = null;
				});
			}
			return fetchDiscordInfoPromise;
		},
		fetchGuildRoles ({commit}, guildID) {
			if (!fetchGuildRolesPromise) {
				fetchGuildRolesPromise = getGuildRoles(guildID).then(async response => {
					commit('SET_GUILD_ROLES', {
						guildID,
						roles: response.ok ? await response.json().catch(() => null) : null,
					});
					fetchGuildRolesPromise = null;
				});
			}
			return fetchGuildRolesPromise;
		},
		fetchGuildChannels ({commit}, guildID) {
			if (!fetchGuildChannelsPromise) {
				fetchGuildChannelsPromise = getGuildChannels(guildID).then(async response => {
					commit('SET_GUILD_CHANNELS', {
						guildID,
						channels: response.ok ? await response.json().catch(() => null) : null,
					});
					fetchGuildChannelsPromise = null;
				});
			}
		},
		fetchEmojis ({commit}) {
			if (!fetchEmojisPromise) {
				fetchEmojisPromise = getAllEmojis().then(async response => {
					commit('SET_EMOJIS', response.ok ? await response.json().catch(() => null) : null);
					fetchEmojisPromise = null;
				});
			}
		},
	},
});
