const app = new Vue({
    el: '#root',
    data: {
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                active: false,
                onlinePeriod: 'Ultimo accesso ieri',
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
                onlinePeriod: 'Ultimo accesso ieri',
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
                onlinePeriod: 'Ultimo accesso ieri',
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
                name: 'Giovanni',
                avatar: '_4',
                visible: true,
                active: false,
                onlinePeriod: 'Ultimo accesso ieri',
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
    },
    updated() {
        //scroll to the bottom message just after the uptdate page
        document.getElementsByClassName("chat-area")[0].scrollTop = document.getElementsByClassName("chat-area")[0].scrollHeight;
    },
    methods: {
        changeChat: function (index) {
            this.contactIndex = index;
            this.onlineStatus[index] = 'Ultimo accesso ieri'
        },
        // FUNZIONE PER L'INVIO DEL MESSAGGIO
        sendMessage: function() {
            const index = this.contactIndex;
            if (this.messageText != "") {
                this.contacts[index].messages.push(
                    {
                        date: this.actualDate,
                        message: this.messageText,
                        status: 'sent',
                        btnInfoRemove: false
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
                this.contacts[index].active = true;
                if (this.contacts[index].active == true) {
                        if (this.contacts[index].onlinePeriod == 'Ultimo accesso ieri') {
                        setTimeout(() => {
                            this.contacts[index].onlinePeriod = "Online";
                            }, 2000)
                        setTimeout(() => {
                            this.contacts[index].onlinePeriod = "Ultimo accesso oggi alle " + this.onlineTime;
                            }, 10000);
                        }
                    }
            }
        },
        // FUNZIONE PER ORA ATTUALE
        timeNow: function () {
            setInterval(() => {
                this.actualDate =
                    dayjs().format('DD/MM/YYYY') + " " +
                    dayjs().format('HH:mm:ss');
            }, 1000);
        },
        // FUNZIONE PER ORA ACCESSO ONLINE
        onlineAt: function() {
            setInterval(() => {
                return this.onlineTime = dayjs().format('HH:mm:ss');
            }, 1000);
        },
        // FUNZIONE PER CERCARE CHAT
        searchContact: function() {
            for (let i = 0; i < this.contacts.length; i++) {
                this.contactName = this.contacts[i].name;
                if (this.contactName.toLowerCase().includes(this.inputSearch.toLowerCase())) {
                    this.contacts[i].visible = true;
                } else {
                    this.contacts[i].visible = false;
                }
            }
        },
        // FUNZIONE PER MOSTRARE BOTTONI DI INFO E DELETE
        showButtons: function(index) {
            if (this.contacts[this.contactIndex].messages[index].btnInfoRemove == false) {
                this.contacts[this.contactIndex].messages[index].btnInfoRemove = true;
            } else {
                this.contacts[this.contactIndex].messages[index].btnInfoRemove = false;
            }
        },
        // FUNZIONE PER CANCELLARE IL MESSAGGIO
        deleteMex: function(index) {
            this.contacts[this.contactIndex].messages.splice(index, 1);
        },
        //FUNZIONE PER LA DARK MODE
        darkMode: function() {
            const element = document.body;
            element.classList.toggle("dark-mode")
        }
    },
});