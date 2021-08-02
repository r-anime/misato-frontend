/* global __RUNTIME_CONFIG__ */ // token replaced by Webpack

/** Converts an endpoint path to a full URI based on the configured API base. */
export const endpoint = path => `${__RUNTIME_CONFIG__.apiBaseURI}${path}`;

// Basic functions for HTTP methods
const get = (path, opts = {}) => fetch(endpoint(path), {method: 'GET', credentials: 'include', ...opts});
const post = (path, opts = {}) => fetch(endpoint(path), {method: 'POST', credentials: 'include', ...opts});
const put = (path, opts = {}) => fetch(endpoint(path), {method: 'PUT', credentials: 'include', ...opts});
// because `delete` is a keyword, we have to get creative with this one
const httpDelete = (path, opts) => fetch(endpoint(path), {method: 'DELETE', credentials: 'include', ...opts});

// Functions for sending JSON bodies with requests
const postJSON = (endpoint, data = {}) => post(endpoint, {
	headers: {'content-type': 'application/json'},
	body: JSON.stringify(data),
});
const putJSON = (endpoint, data = {}) => put(endpoint, {
	headers: {'content-type': 'application/json'},
	body: JSON.stringify(data),
});

// Auth info
export const getDiscordInfo = () => get('/auth/discord/about');
export const getRedditInfo = () => get('/auth/reddit/about');

// Guild information
export const getManagedGuilds = () => get('/api/guilds/managed');
export const getGuildInfo = guildID => get(`/api/guilds/${guildID}`);
export const getGuildChannels = guildID => get(`/api/guilds/${guildID}/channels`);
export const getGuildRoles = guildID => get(`/api/guilds/${guildID}/roles`);

// Member information
export const getMemberInfo = (guildID, memberID) => get(`/api/guilds/${guildID}/members/${memberID}/about`);
export const getMemberNotes = (guildID, memberID) => get(`/api/guilds/${guildID}/members/${memberID}/notes`);
export const getMemberWarnings = (guildID, memberID) => get(`/api/guilds/${guildID}/members/${memberID}/warnings`);
export const getMemberKicks = (guildID, memberID) => get(`/api/guilds/${guildID}/members/${memberID}/kicks`);
export const getMemberBans = (guildID, memberID) => get(`/api/guilds/${guildID}/members/${memberID}/bans`);

export const deleteMemberNote = (guildID, memberID, noteID) => httpDelete(`/api/guilds/${guildID}/members/${memberID}/notes/${noteID}`);
export const deleteMemberWarning = (guildID, memberID, noteID) => httpDelete(`/api/guilds/${guildID}/members/${memberID}/warnings/${noteID}`);
export const deleteMemberKick = (guildID, memberID, noteID) => httpDelete(`/api/guilds/${guildID}/members/${memberID}/kicks/${noteID}`);
export const deleteMemberBan = (guildID, memberID, noteID) => httpDelete(`/api/guilds/${guildID}/members/${memberID}/bans/${noteID}`);

// Verification info
export const confirmVerify = guildID => post(`/api/verification/${guildID}`);
export const getVerificationConfig = guildID => get(`/api/verification/${guildID}/configuration`);
export const setVerificationConfig = (guildID, data) => postJSON(`/api/verification/${guildID}/configuration`, data);

// Filter info
export const getFilterConfig = guildID => get(`/api/filters/${guildID}/configuration`);
export const setFilterConfig = (guildID, rule) => postJSON(`/api/filters/${guildID}/configuration`, rule);

// Channel automation info
export const getAllEmojis = () => get('/api/channel-automation/emojis');
export const getChannelAutomationInfo = guildID => get(`/api/channel-automation/${guildID}`);
export const setChannelAutomationInfo = (guildID, body) => putJSON(`/api/channel-automation/${guildID}`, body);
