export const getAnswers = (e, questionsList) => {
    const answers = {
        correctAnswer: 0,
        uncorrectAnswer: 0,
        undoneQuestions: 0
    };
    
    const chekers = {
        textInput: (field, fieldName, correctAnswer) => {
            answers[fieldName]=field.value
            field.value ?
            field.value === correctAnswer ?
            answers.correctAnswer++ : answers.uncorrectAnswer++
            :
            answers.undoneQuestions++
        },
        checkbox: (fields, fieldName, correctAnswer) => {
            answers[fieldName] = [];
            for (let i = 0; i < fields.length; i++) {
                if (fields[i].checked) {
                    answers[fieldName].push(fields[i].value)
                }
            }
            
            answers[fieldName].length ?
            checkAnswersForCheckbox(answers[fieldName], correctAnswer) ?
            answers.correctAnswer++ : answers.uncorrectAnswer++
            :
            answers.undoneQuestions++

            answers[fieldName] = answers[fieldName].join(',')
        },
        radio: (fields, fieldName, correctAnswer) => {
            for (let i = 0; i < fields.length; i++) {
                if (fields[i].checked) {
                    answers[fieldName] = fields[i].value
                    fields[i].value === correctAnswer ?
                    answers.correctAnswer++ : answers.uncorrectAnswer++
                    return
                }
            }
            answers.undoneQuestions++
        },
        select: (fields, fieldName, correctAnswer) => {
            for (let i = 0; i < fields.length; i++) {
                if (fields[i].selected && fields[i].value ) {
                    answers[fieldName]= fields[i].value
                    fields[i].value === correctAnswer ?
                    answers.correctAnswer++ : answers.uncorrectAnswer++
                    return
                }
            }
            answers.undoneQuestions++
        }
    }
    
    questionsList.forEach( question => {
        const { elements } = e.currentTarget;
        const checker = chekers[question.type]
        checker(elements[question.name], question.name, question.corectAnswer)
        }
    )

    return answers;
}

const checkAnswersForCheckbox = (userAnswers, correctAnswers) => {
    let countOfCorrectAnswers = 0
    userAnswers.forEach(asnwer => {
        correctAnswers.forEach(correctAnswer => {
            if (asnwer === correctAnswer) {
                countOfCorrectAnswers++
            }
        })
    })
    
    return countOfCorrectAnswers === correctAnswers.length ? true : false
}