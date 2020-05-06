<template>
    <div v-show="visible" class="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
        <div class="fixed inset-0 transition-opacity mt-0">
            <div class="absolute inset-0 bg-gray-500 opacity-75 mt-0" v-on:click="$emit('close-scoreboard')"></div>
        </div>
        <div class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <div class="bg-white px-2 pb-4 sm:p-6 sm:pl-0 sm:pt-0 sm:pb-4">
                <div class="pt-6">
                    <div class="sm:mt-0 sm:ml-8 text-left">
                        <h3 class="uppercase text-xl font-medium text-gray-900 text-left">
                            Scoreboard
                        </h3>
                        <table class="mt-2 w-full">
                            <thead>
                                <tr>
                                    <th class="text-right pr-4">Score</th>
                                    <th class="text-left pl-4">Username</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(score, index) in scores" :key="index">
                                    <td class="text-right pr-4">{{ score.score }}</td>
                                    <td class="text-left pl-4 py-1">{{ score.username }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                    <button type="button" v-on:click="$emit('close-scoreboard')" class="button button-gray">
                    Close
                    </button>
                </span>
            </div>
        </div>
        
    </div>
</template>

<script>
    export default {
        name: "Scoreboard",
        props: {
            scores: Array,
            visible: Boolean
        },
        created() {
            const onEscape = (e) => {
                if (this.visible && e.keyCode === 27) {
                    this.$emit('close-scoreboard')
                }
            }
            document.addEventListener('keydown', onEscape)
            this.$once('hook:destroyed', () => {
                document.removeEventListener('keydown', onEscape)
            })
        },
    };
</script>
