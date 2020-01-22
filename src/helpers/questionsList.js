
export const questionsList = [
    {
        type: 'textInput',
        questionText: 'What year was Kharkiv founded?',
        corectAnswer: '1654',
        name: 'qstn1'
    },
    {
        type: 'checkbox',
        questionText: 'What Kharkiv Univercities are in the TOP-12 Ukrainian Uni?',
        labels: ['V. N. Karazin Kharkiv National University','Kharkiv National Medical University','National Technical University «Kharkiv Polytechnic Institute»','Kharkiv National University of Radio Electronics','Kharkiv National University of Economics'],
        corectAnswer: ['V. N. Karazin Kharkiv National University', 'Kharkiv National Medical University'],
        name: 'qstn2'
    },
    {
        type: 'radio',
        questionText: 'How many Stations are in Kharkiv Subway?',
        labels: [23,28,30,33],
        corectAnswer: '30',
        name: 'qstn3'
    },
    {
        type: 'select',
        questionText: 'What is the Thermometer?',
        options: ['Place near Ploschad Konstitutsii Station','Medical tool','Wheather criteria','Thing on your phone display'],
        corectAnswer: 'Place near Ploschad Konstitutsii Station',
        name: 'qstn4'
    }
]