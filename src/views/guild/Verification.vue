<template>
	<div>
		<h1 class="title">
			Verification Settings
		</h1>

		<b-field>
			<b-checkbox v-model="verificationEnabled">
				Enable Reddit verification
			</b-checkbox>
		</b-field>

		<b-field label="Verification role">
			<role-dropdown
				v-model="verificationRoleID"
				placeholder="Select a role"
				:disabled="!verificationEnabled"
				:loading="!loaded"
				:roles="roles"
			/>
		</b-field>

		<b-field
			label="Verification URL"
			message="Send your members to this link to verify their accounts."
		>
			<div class="control">
				<input
					class="input"
					readonly
					:disabled="!verificationEnabled"
					:value="verificationURL"
				>
			</div>
		</b-field>

		<b-field grouped>
			<b-button
				type="is-success"
				:loading="submitting"
				@click="submit()"
			>
				Save
			</b-button>
		</b-field>
	</div>
</template>

<script>
import {mapActions, mapState} from 'vuex';

import RoleDropdown from '../../components/RoleDropdown.vue';
import {getVerificationConfig, setVerificationConfig} from '../../util/requests';

export default {
	components: {RoleDropdown},
	data () {
		return {
			verificationEnabled: false,
			verificationRoleID: null,
			loadedGuildSettings: false,
			submitting: false,
		};
	},
	computed: {
		...mapState([
			'guildRoles',
		]),
		roles () {
			return this.guildRoles[this.guildID];
		},
		loaded () {
			return this.roles && this.loadedGuildSettings;
		},
		guildID () {
			return this.$route.params.guildID;
		},
		verificationURL () {
			return `${window.location.origin}/verify/${this.guildID}`;
		},
	},
	async created () {
		this.fetchGuildRoles(this.guildID);
		const guildSettings = await getVerificationConfig(this.guildID).then(response => {
			if (response.status === 404) {
				return {};
			}
			return response.json();
		});
		this.verificationEnabled = !!guildSettings.roleID;
		this.verificationRoleID = guildSettings.roleID;
		this.loadedGuildSettings = true;
	},
	methods: {
		...mapActions([
			'fetchGuildRoles',
		]),
		async submit () {
			this.submitting = true;
			const response = await setVerificationConfig(this.guildID, {
				roleID: this.verificationEnabled && this.verificationRoleID,
			});
			this.submitting = false;
			if (!response.ok) {
				// eslint-disable-next-line no-alert
				alert(`Couldn't save settings, server gave status code ${response.status}.`);
			}
		},
	},
};
</script>
