
export const questionsList = [
    {
        type: 'textInput',
        questionText: '1+1?',
        corectAnswer: '2',
        name: 'qstn1'
    },
    {
        type: 'checkbox',
        questionText: '2+2 and 1+1?',
        labels: [1,2,3,4,5],
        corectAnswer: ['2', '4'],
        name: 'qstn2'
    },
    {
        type: 'radio',
        questionText: '3*3?',
        labels: [7,8,9,10],
        corectAnswer: '9',
        name: 'qstn3'
    },
    {
        type: 'select',
        questionText: '5+15?',
        options: [10,20,30,40],
        corectAnswer: '20',
        name: 'qstn4'
    }
]