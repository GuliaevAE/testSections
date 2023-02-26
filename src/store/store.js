import { defineStore } from 'pinia'


export const useCounterStore = defineStore('counter', {
    state: () => ({
        allSections:
            [{
                type: 'sect1',
                sect1Content: { header: "Header", content: "Content" },
                sect2arraySectionCard: [{ header: "Header", content: "Content", icon: 'none' }]
            },
            {
                type: 'sect2',
                sect1Content: { header: "Header", content: "Content" },
                sect2arraySectionCard: [{ header: "Header", content: "Content", icon: 'mdi:cat' }]
            }]
    }),
    getters: {
        getAllSections: (state) => state.allSections,
    },
    actions: {
        setallSections(e) {
            this.allSections = e
        },

        addSectioncard(e) {
            this.allSections[e.SectionPosition].sect2arraySectionCard.push({ header: "Header", content: "Content" })
            localStorage.setItem('allSections', JSON.stringify(this.allSections))
        },
        deleteSectionCard(e) {
            this.allSections[e.SectionPosition].sect2arraySectionCard = this.allSections[e.SectionPosition].sect2arraySectionCard.filter((x, k) => k !== e.SectionCardPosition)
            localStorage.setItem('allSections', JSON.stringify(this.allSections))
        },
        changeSectionCard(e) {
            this.allSections[e.SectionPosition].sect2arraySectionCard[e.SectionCardPosition].header = e.header
            this.allSections[e.SectionPosition].sect2arraySectionCard[e.SectionCardPosition].content = e.content
            this.allSections[e.SectionPosition].sect2arraySectionCard[e.SectionCardPosition].icon = e.cardIcon
            localStorage.setItem('allSections', JSON.stringify(this.allSections))
        },



        addSection(e) {
            this.allSections.push({
                type: e,
                sect1Content: { header: "Header", content: "Content" },
                sect2arraySectionCard: [{ header: "Header", content: "Content", icon: 'none' }]
            })
            localStorage.setItem('allSections', JSON.stringify(this.allSections))
        },
        changeSection1Data(e) {
            this.allSections[e.SectionPosition].sect1Content.header = e.header
            this.allSections[e.SectionPosition].sect1Content.content = e.content
            localStorage.setItem('allSections', JSON.stringify(this.allSections))
        },
        deleteSection(e) {
            this.allSections = this.allSections.filter((x, k) => k !== e)
            localStorage.setItem('allSections', JSON.stringify(this.allSections))
        },
        changeSectioPosition(e) {
            if (e.mouseUp !== e.mouseDown) {
                let one = this.allSections[e.mouseUp]
                let two = this.allSections[e.mouseDown]
                this.allSections[e.mouseUp] = two
                this.allSections[e.mouseDown] = one
                this.allSections.splice(e.mouseUp , 1, two)
                this.allSections.splice(e.mouseDown , 1, one)
                localStorage.setItem('allSections', JSON.stringify(this.allSections))
            }


        }

    },
})