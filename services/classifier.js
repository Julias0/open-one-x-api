const { Classifier } = require('ml-classify-text');
const questionService = require('./questions');

const growthDevQuestions = questionService.growthDevQuestions;
const communicationQuestions = questionService.communicationQuestions;
const challengesRoadblocksQuestions = questionService.challengesRoadblocksQuestions;
const feedbackQuestions = questionService.feedbackQuestions;

const classifier = new Classifier();

classifier.train(growthDevQuestions, 'growth and development')
classifier.train(communicationQuestions, 'communication')
classifier.train(challengesRoadblocksQuestions, 'challenges and roadblocks')
classifier.train(feedbackQuestions, 'feedback')

module.exports = {
  classify: (text) => {
    return classifier.predict(text);
  }
}