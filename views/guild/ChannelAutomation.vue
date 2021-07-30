<template>
	<div>
		<h1 class="title">
			Channels, Roles, and Reacts
		</h1>

		<div class="level">
			<div class="level-left">
				<div class="field is-grouped">
					<div class="control">
						<b-button
							type="is-success"
							:loading="submitting"
							@click="submit()"
						>
							Save
						</b-button>
					</div>
					<div class="control">
						<b-button
							type="is-danger"
							@click="revert()"
						>
							Revert
						</b-button>
					</div>
				</div>
			</div>
		</div>

		<b-field label="Reacts channel">
			<b-select
				disabled
				placeholder="Choose a channel..."
				:loading="!loaded"
			>
				<option
					:value="channelID"
				>
					channelID
				</option>
			</b-select>
		</b-field>

		<strong class="label">Reaction buttons</strong>
		<template v-if="loaded">
			<div
				v-for="(category, index) of categories"
				:key="index"
			>
				<channel-automation-category
					v-model="categories[index]"
					@delete="deleteCategory(categories[index])"
				/>
			</div>

			<b-button
				type="is-primary"
				@click="addCategory()"
			>
				Add section
			</b-button>
		</template>
	</div>
</template>

<script>
import ChannelAutomationCategory from '../../components/ChannelAutomationCategory.vue';
import {getChannelAutomationInfo, setChannelAutomationInfo} from '../../util/requests';
export default {
	components: {
		ChannelAutomationCategory,
	},
	data () {
		return {
			categories: null,
			channelID: null,
			submitting: false,
		};
	},
	computed: {
		guildID () {
			return this.$route.params.guildID;
		},
		loaded () {
			return this.categories != null && this.channelID != null;
		},
	},
	created () {
		getChannelAutomationInfo(this.guildID).then(res => res.json()).then(data => {
			this.categories = data.categories.map(c => JSON.stringify(c));
			this.channelID = data.channelID;
		});
	},
	methods: {
		addCategory (name = 'New Section') {
			this.categories.push(JSON.stringify({name, triggers: []}));
		},
		deleteCategory (category) {
			this.categories.splice(this.categories.indexOf(category), 1);
		},
		submit () {
			if (this.submitting) return;
			this.submitting = true;
			setChannelAutomationInfo(this.guildID, {
				channelID: this.channeID,
				categories: this.categories.map(c => JSON.parse(c)),
			}).then(response => {
				if (!response.ok) {
					// eslint-disable-next-line no-alert
					alert('Failed');
				}
				this.submitting = false;
			});
		},
		revert () {
			// eslint-disable-next-line no-alert
			alert('dont');
		},
	},
};
</script>
