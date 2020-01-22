export const getAnswers = (e, questionsList) => {
    const answers = {
        correctAnswer: 0,
        uncorrectAnswer: 0,
        undoneQuestions: 0
    };
    
    const chekers = {
        textInput: (field, fieldName, correctAnswer) => {
            answers[fieldName] = field.value

            if (!field.value) {
                answers.undoneQuestions += 1;    
            } else if (field.value === correctAnswer) {
                answers.correctAnswer += 1;    
            } else {
                answers.uncorrectAnswer += 1;
            }
        },
        checkbox: (fields, fieldName, correctAnswer) => {
            answers[fieldName] = [];

            for (let i = 0; i < fields.length; i++) {
                if (fields[i].checked) {
                    answers[fieldName].push(fields[i].value)
                }
            }
            

            if (!answers[fieldName].length) {
                answers.undoneQuestions += 1;
            } else if (isAllAnswersCorrect(answers[fieldName], correctAnswer)) {
                answers.correctAnswer += 1;    
            } else {
                answers.uncorrectAnswer +=1;
            }

            // Transform answers array to string
            answers[fieldName] = answers[fieldName].join(',')
        },
        radio: (fields, fieldName, correctAnswer) => {
            for (let i = 0; i < fields.length; i++) {
                if (fields[i].checked) {
                    answers[fieldName] = fields[i].value
                    if (fields[i].value === correctAnswer) {
                        answers.correctAnswer += 1; 
                    } else {
                        answers.uncorrectAnswer +=1;
                    }
                    return false
                }  
            }
            answers.undoneQuestions += 1;
        },
        select: (fields, fieldName, correctAnswer) => {
            for (let i = 0; i < fields.length; i++) {
                if (fields[i].selected && fields[i].value ) {
                    answers[fieldName]= fields[i].value
                    if (fields[i].value === correctAnswer) {
                        answers.correctAnswer += 1; 
                    } else {
                        answers.uncorrectAnswer +=1;
                    }
                    return false
                }
            }
            answers.undoneQuestions++
        }
    }
    
    questionsList.forEach( question => {
        const { elements } = e.currentTarget;
        // select method for check if the aswer is correct depending on question type   
        const checker = chekers[question.type]
        checker(elements[question.name], question.name, question.corectAnswer)
    });

    return answers;
}

const isAllAnswersCorrect = (userAnswers, correctAnswers) => {
    let countOfCorrectAnswers = 0;

    userAnswers.forEach(answer => {
        if (correctAnswers.includes(answer)) {
            countOfCorrectAnswers += 1;
        }
    })
    
    return countOfCorrectAnswers === correctAnswers.length;
}