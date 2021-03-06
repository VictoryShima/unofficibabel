angular.module('Socializer').controller('JobFetchController',
    function ($scope, MemoryService, UnbabelApiService)
    {

        // add the entire set of jobs to the Memory Service
        $scope.getHistory = function ( event, max_length ) {

            UnbabelApiService.getTranslationsByStatus(
                { status: null },
                // success
                function ( data, headers ) {
                    MemoryService.sessions = [];
                    var length = ((max_length === 0) ? data.length : (data.length > max_length ? max_length : data.length));
                    for ( var i = 0; i < length; ++i ) {
                        var session = {
                            uid: data[i].uid,
                            status: data[i].status,
                            targetLanguageCode: data[i].target_language,
                            translatedText: angular.isDefined(data[i].translatedText) ? data[i].translatedText : null
                        };
                        MemoryService.sessions.push(session);
                    }
                },
                // error
                function ( data, headers ) {
                    console.log('getTranslationsByStatus Error: ', data, headers());
                }
            );

        };

        console.log('JobFetchController: ', $scope);

    }
);