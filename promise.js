var successfunc = function successCallback(result) {
    console.log("Audio file ready at URL: " + result);
    return "2nd Audio file ready at URL: " + result;
}

var failurefunc = function failureCallback(error) {
    console.error("Error generating audio file: " + error);
}

function createAudioFileAsync(audioCreate, success, fail) {
    if (audioCreate) {
        success("somewhere");
    }
    else {
        fail("otherwhere");
    }
}

function createAudioFileAsyncPromiseA(audioCreate) {
    var promise = new Promise((resolve, reject) => {
        if (audioCreate) {
            resolve("somewhere A");
        }
        else {
            reject("otherwhere A");
        }
    });
    return promise;
}

const createAudioFileAsyncPromiseB = audioCreate =>
    new Promise((resolve, reject) => {
        if (audioCreate) {
            resolve("somewhere B");
        }
        else {
            reject("otherwhere B");
        }
    });

const createAudioFileAsyncPromiseC = audioCreate => {
    var p = new Promise((resolve, reject) => {
        if (audioCreate) {
            resolve("somewhere C");
        }
        else {
            reject("otherwhere C");
        }
    });
    return p;
};



var audiocreate = false;

createAudioFileAsync(audiocreate, successfunc, failurefunc);

createAudioFileAsyncPromiseA(audiocreate).then(successfunc).catch(failurefunc);

createAudioFileAsyncPromiseB(audiocreate).then(successfunc).catch(failurefunc);

createAudioFileAsyncPromiseC(audiocreate).then(successfunc).catch(failurefunc);

successfunc2nd = (rst) => console.log(rst);

createAudioFileAsyncPromiseA(audiocreate).then(successfunc).then(successfunc2nd).catch(failurefunc)