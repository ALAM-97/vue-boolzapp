const app = new Vue({
    el: '#root',
    data: {
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                active: false,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent',
                        btnInfoRemove: false
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di dargli da mangiare',
                        status: 'sent',
                        btnInfoRemove: false
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                active: false,
                messages: [{
                    date: '20/03/2020 16:30:00',
                    message: 'Ciao come stai?',
                    status: 'sent',
                    btnInfoRemove: false
                },
                {
                    date: '20/03/2020 16:30:55',
                    message: 'Bene grazie! Stasera ci vediamo?',
                    status: 'received'
                },
                {
                    date: '20/03/2020 16:35:00',
                    message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                    status: 'received'
                }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                active: false,
                messages: [{
                    date: '28/03/2020 10:10:40',
                    message: 'La Marianna va in campagna',
                    status: 'received'
                },
                {
                    date: '28/03/2020 10:20:10',
                    message: 'Sicuro di non aver sbagliato chat?',
                    status: 'sent',
                    btnInfoRemove: false
                },
                {
                    date: '28/03/2020 16:15:22',
                    message: 'Ah scusa!',
                    status: 'received'
                }
                ],
            },
            {
                name: 'Luiso',
                avatar: '_4',
                visible: true,
                active: false,
                messages: [{
                    date: '10/01/2020 15:30:55',
                    message: 'Lo sai che ha aperto una nuova pizzeria?',
                    status: 'sent',
                    btnInfoRemove: false
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Si, ma preferirei andare al cinema',
                    status: 'received'
                }
                ],
            },
        ],
        contactIndex: 0,
        messageText: '',
        actualDate: '',
        onlineStatus: 'Ultimo accesso ieri',
        onlineTime: '',
        contactName: '',
        inputSearch: '',
        // btnInfoRemove: false
    },
    mounted: function() {
            this.timeNow();
            this.onlineAt();
            this.onlineAt();
    },
    methods: {
        changeChat: function (index) {
            this.contactIndex = index;
        },
        sendMessage: function() {
            const index = this.contactIndex;
            if (this.messageText != "") {
                this.contacts[index].messages.push(
                    {
                        date: this.actualDate,
                        message: this.messageText,
                        status: 'sent'
                    }
                );
                this.messageText = '';
                setTimeout(() => {
                    this.contacts[index].messages.push(
                        {
                            date: this.actualDate,
                            message: 'Ok',
                            status: 'received',
                        }
                    )
                }, 5000);
                if (this.contacts[index].active = true) {
                        if (this.onlineStatus == 'Ultimo accesso ieri') {
                        setTimeout(() => {
                            this.onlineStatus = "Online";
                            }, 2000)
                        setTimeout(() => {
                            this.onlineStatus = "Ultimo accesso oggi alle " + this.onlineTime;
                            }, 10000);
                        }
                    }
                } else {
                    this.onlineStatus = 'Ultimo accesso ieri';
                    for (let i = 0; i < this.contacts.length; i++) {
                        if (this.contacts[i].active = true) {
                            return this.contacts[i].active = false;
                        }
                }
            }
        },
        timeNow: function () {
            setInterval(() => {
                this.actualDate =
                    dayjs().format('DD/MM/YYYY') + " " +
                    dayjs().format('HH:mm:ss');
            }, 1000);
        },
        onlineAt: function() {
            setInterval(() => {
                return this.onlineTime = dayjs().format('HH:mm');
            }, 1000);
        },
        searchContact: function() {
            for (let i = 0; i < this.contacts.length; i++) {
                this.contactName = this.contacts[i].name;
                if (this.contactName.toLowerCase().includes(this.inputSearch)) {
                    this.contacts[i].visible = true;
                } else {
                    this.contacts[i].visible = false;
                }
            }
        },
        showButtons: function(index) {
            if (this.contacts[this.contactIndex].messages[index].btnInfoRemove == false) {
                this.contacts[this.contactIndex].messages[index].btnInfoRemove = true;
            } else {
                this.contacts[this.contactIndex].messages[index].btnInfoRemove = false;
            }
        },
        deleteMex: function(index) {
            this.contacts[this.contactIndex].messages.splice(index, 1);
        }
    },
});