<template>
	<div class="app">
		<b-navbar
			type="is-primary"
			wrapper-class="container"
		>
			<template slot="brand">
				<b-navbar-item
					tag="router-link"
					:to="{name: 'home'}"
				>
					Misato
				</b-navbar-item>
			</template>
			<template slot="end">
				<b-navbar-dropdown
					v-if="discordInfo"
					right
					boxed
				>
					<template slot="label">
						<figure class="avatar image is-32x32">
							<img :src="discordInfo.avatarURL + '?size=64'">
						</figure>
					</template>
					<b-navbar-item tag="span">
						<span>Hi, <strong>{{ discordInfo.username }}#{{ discordInfo.discriminator }}</strong></span>
					</b-navbar-item>
					<b-navbar-item
						:href="discordLogoutHref()"
						class="has-text-danger"
					>
						Log out
					</b-navbar-item>
				</b-navbar-dropdown>
				<b-navbar-item
					v-else-if="discordInfo !== undefined"
					tag="div"
				>
					<a
						:href="discordLoginHref()"
						class="button is-small is-primary is-inverted"
					>
						Log in with Discord
					</a>
				</b-navbar-item>
			</template>
		</b-navbar>
		<keep-alive>
			<router-view />
		</keep-alive>
	</div>
</template>

<script>
import {mapState} from 'vuex';
import {endpoint} from './util/requests';

// Encoded current URL, passed to auth endpoints
const here = encodeURIComponent(window.location);

export default {
	computed: {
		...mapState(['discordInfo']),
	},
	methods: {
		discordLoginHref () {
			return endpoint(`/auth/discord?next=${here}`);
		},
		discordLogoutHref () {
			return endpoint(`/auth/discord/logout?next=${here}`);
		}
	},
};
</script>

<style lang="scss" src="./customization.scss"></style>
<style lang="scss">
// .avatar class used in combination with the Bulma .image class (presents rounded avatar images)
.image.avatar {
	img {
		border-radius: 50%;
		// fix for avatar in navbar gettingf squished
		max-height: none;
	}
}
</style>
