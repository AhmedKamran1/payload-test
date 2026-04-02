## Notes (I Exceeded more than 2 hrs)
What to do if test takes longer than 2 hours?
**Before exceeding 2 hours**, Write a brief note in your README explaining:
- Which parts you prioritized and why
  
Ans) I started by prioritizing the quiz result saving feature since it was missing from the template and the existing base UI allowed me to proceed without disruption. Next, I worked on the encryption and decryption logic and implemented hooks to manage the notes data. After that I added the score breakdown on the score and results page. I Then removed the static data and integrated dynamic quiz data with shuffling the option. Throughout the process I also analyzed and broke down the existing UI components already present in the template. Finally, I reviewed everything and performed cleanup wherever possible.

- Which parts you skipped or simplified and why

Ans) I didnt intentionally skip any of the listed requirements because I spent significantly more than the initial 2 hour timeframe since I am new to payload and had to first understand how to set up a postgre database and grasp its basics. I also only had a basic understanding of TS, so I needed to revisit some of its fundamentals as well. As for simplification I broke down some of the existing UI components from the base template such as the score component, and focused on separating concerns into different files like moving TS declarations so the components are easier to read. I also refined some naming conventions, file names, and overall structure where they felt inconsistent or unclear.

- What you would do to complete or improve the test if given more time

Ans) Since I aimed to complete all the requirements without intentionally leaving anything, there is not anything remaining that I specifically want to finish but there are  few improvements I would consider.

Now that the quizzes are managed dynamically through the CMS and can be updated, I currently display only the latest quiz in the app. I will like to show a list of all available quizzes allowing users to select which one they want to attempt.

On the backend side, I will like to introduce a relationship between quiz attempts and their respective quizzes. This would make it much easier to track which quiz a particular set of answers belongs to. Other than that maybe implementing versioning would be better here, Since quizzes collection can be updated over time those changes will not reflect in existing quiz attempts collection, so maybe here maintaining versions would help preserve the exact state of a quiz at the time it was attempted to keep track in future.

- Any assumptions or architectural choices you made

Ans) I dont think I made any assumptions as most of the tasks were clear. The only confusing part was the bonus point mentioning “SSG with fallback or SSR for the score screen.” From my understanding, implementing SSG or SSR on the score page is not possible because the results are calculated at runtime based on the users selected answers, which are already stored in the local frontend state and contain all the data needed for total score and breakdown calculations.

Its possible that this requirement was intended for the initial quiz load, where using SSR is possible. For the results page it doesnt seem applicable as well since retrieving past results is done by manually entering an email and searching, making it a purely client side operation.

Regarding architectural decisions since this was a small template, I didnt try to over engineer it. One thing I made was around the score breakdown cards, which are used in both the score screen and the view results screen. I refactored this into a single reusable component as both places shared the same logic and data.
