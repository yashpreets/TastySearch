var fileName = './dataset/finefoods.txt';
var fs = require('fs'),
readline = require('readline'),
instream = fs.createReadStream(fileName),
outstream = new (require('stream'))();

var successStatus = 200;
var NO_OF_SETS_TO_RETURN = 20;
var lineCount = 0;
var loadParsedData = [];
var commonFunctions = require('./common/commonFunctions');

exports.openSearchTab = function(req,res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    var file = fs.createReadStream('./searchTab.html');
    file.pipe(res);
};

exports.searchQuery = function(req,res){
    exports.checkIfDataLoaded(function(){
        console.log("Dataset Length:: ",loadParsedData.length);
        exports.getSearchResult(req,res,function(result){
            commonFunctions.endRequest(res,successStatus,result);
        });
    });
};

exports.getSearchResult = function(req,res,callback){
    var searchKeywords = req.query.search;
    var noOfSearchResultsToDisplay = parseInt(req.query.records);
    if(commonFunctions.isEmpty(noOfSearchResultsToDisplay)){
        noOfSearchResultsToDisplay = NO_OF_SETS_TO_RETURN;
    }
    var result;
    if(commonFunctions.isEmpty(searchKeywords)){
        result = "Enter search string";
    }else{
        var wordList = searchKeywords.split(" ");
        var distinctWordList = commonFunctions.getUniqueElement(wordList);
        var noOfWordsToSearch = distinctWordList.length;
        console.log("getSearchResult:: ",distinctWordList);
        var searchResults = [];
        for(var idx in loadParsedData){
            var reviewSet = loadParsedData[idx];
            var review = reviewSet.review;
            var wordsFound = 0;
            for(var j in distinctWordList){
                var word = distinctWordList[j];
                var found = 0;
                if(review.summary.indexOf(word) !== -1){
                   found = 1;
                }
                if(review.text.indexOf(word) !== -1){
                   found = 1;
                }
                wordsFound += found;
            }
            if(wordsFound > 0){
                searchResults[idx] = 0;
                if(searchResults.length <= noOfSearchResultsToDisplay+1){
                    searchResults[idx] = wordsFound;
                }else{
                    searchResults = replaceTheMinimum(searchResults,wordsFound,idx);
                }
            }
        }
        if(searchResults.length > noOfSearchResultsToDisplay){
            searchResults = replaceTheMinimum(searchResults,wordsFound,idx);
        }
        var result = {};
        result.searchedData = [];
        result.noOfResults = 0;
        for(var recordIdx in searchResults){
            var matches = searchResults[recordIdx];
            result.searchedData.push(loadParsedData[recordIdx].review.review);
            result.noOfResults++;
        }
    }
    callback(result);
};

function replaceTheMinimum(searchResults,wordsFound,idx){
    var done = 0;
    var equalFound = 0;
    for(var recordIdx in searchResults){
        var matches = searchResults[recordIdx];
        if(wordsFound > matches){
            searchResults[recordIdx] = matches;
            delete searchResults[recordIdx];
            done = 1;
            break;
        }
        if(wordsFound == matches){
            equalFound = 1;
        }
    }
    if(done == 0 && equalFound == 1){
        for(var recordIdx in searchResults){
            var matches = searchResults[recordIdx];
            if(wordsFound == matches  && loadParsedData[recordIdx].review.score <  loadParsedData[recordIdx].review.score){
                searchResults[recordIdx] = matches;
                delete searchResults[recordIdx];
                done = 1;
                break;
            }
        }
    }
    return searchResults;
}


exports.checkIfDataLoaded = function(callback){
    if(loadParsedData.length != 0 ){
        callback();
    }
    rl = readline.createInterface(instream, outstream);
    lineCount = 0;
    rl.on('line', function (line) {
        if(loadParsedData[lineCount] == undefined){
            loadParsedData[lineCount] = {};
            loadParsedData[lineCount].review = {review:[],text:'',score:'',summary:''};
        }
        if(!commonFunctions.isEmpty(line)){
            loadParsedData[lineCount].review.review.push(line);
            if(line.indexOf("review/text:") !== -1){
                loadParsedData[lineCount].review.text = commonFunctions.ltrim(line,"review/text: ");
            }
            if(line.indexOf("review/score:") !== -1){
                loadParsedData[lineCount].review.score = commonFunctions.ltrim(line,"review/score: ");
            }
            if(line.indexOf("review/summary:") !== -1){
                loadParsedData[lineCount].review.summary = commonFunctions.ltrim(line,"review/summary: ");
            }
            if(line.indexOf("review/text") !== -1){
                lineCount++;
            }
        }
    });
    rl.on('close', function (line) {
        console.log('done reading file.');
        callback();
    }); 
};

exports.parseLine = function(line){
    if(commonFunctions.isEmpty(line)){
        return;
    }
};