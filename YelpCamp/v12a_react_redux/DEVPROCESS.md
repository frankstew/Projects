# Add React as Frontend using api calls to backend to make app work:

- get react frontend working with webpack config and everything
- get express working in the backend
- connect the two with axios or fetch or request or something
- fix cross origin request issue with chrome (fixed but now the error isnt happening at all...) (needed to specify to request "http://localhost:5000/" not just "/", "/" gives cross origin issue but whole localhost url doesnt give error) (if i dont add cors(), get a dif cross origin error, but if i add cors(), run, then remove cors without changing route, still works, just add cors()) (wanna see if a proxy is a better idea (need another api but is maybe safer/ more lightweight))
- added react-router(react-router-dom), easiest way to handle routes
- webpack-dev-server key to making react-router run
- add landing page
- add layout
- make layout in App component, cannot have html inside of div
- tried to find /campgrounds, but in the vid his doesnt... just renders no url change, There is an issue when trying to render routes before rendering index.html, doesnt load the react and stuff, so need to first load the "/" route so everything loads properly, then the next route (/campgrounds in this case)
- make async await work, with @babel/polyfill in entry of webpack config
- add hot reload, use 2 terminals, one builds, one runs webpack-dev-server
- add campground index page and related models (campgrounds), linking between pages in react router, make it show campgrounds automatically, not after button click, used componentDidMount() calling a props function so I can keep all api requests in <App />, dont need axios everywhere
- add add campground route, redirect after adding
- refactor components
- choose colors and fonts (coolors, fontpair.co)
- why is show page just being rendered continuosly?? when parent state changes, automatically rerenders every child component. So API calls inside of child components that change parents state cause continuous re-renders, used render prop in <Route />s to call with some conditionals to stop it.
- add show page, without maps.
- add destroy campground route
- add edit campground route, use defaultValue not value to fix read only input issue. Need to fix the rerendering of the show page after update, unless I do an ugly fix to getCampgroundShowData to force it to update, the setState call gets skipped so the changes dont show on the rerender bc of the conditional stuff in getCampgroundShowData to prevent infinite looping, gotta be a way around it, gotta be a better way but whatever check I do seems to cause infinite rerender, works for now. put setState at end of handleCampgroundSubmit edit instead of get CampgroundShowData(forceUpdate), less confusing
- style edit campground, make live changes to text (and image later), using some setState stuff probably, I think the CG is saved in state, so no need for api calls, just setState with onChange, works beautifully, only had to change names so that onChange setState to campgroundToShow, and change form names so it all matched up properly AND IT WORKS FOR IMAGES TOO LMFAO
- add comment routes, index (show page is index), new (DONE), Create(DONE, had to popul8 comments in put route so that they would show up without having to call campground SHOW route again), edit(no edit or upd8, most sites dont allow comment edits, and its complicated to show only edit your comment), update(see edit), destroy(wanted to be able to use findoneandupdate but was weird, it works but seems to rerender entire page instead of just comments stuff, idk if its like that for all of it who knows), no show (could make a show page for replies, if we want to do replies)
- add stars to reviews
- add separate review container (like yelp) so dont 
accidentally delete review when trying to post one
- support multi paragraph reviews
- add reaction to reviews (agree/disagree, like/dislike) (add # likes/dislikes to review model, buttons to show page, and functionality for those buttons, need a put route for like/dislike)
- LIKES: make a new API (all routes, well all the relevant routes, for likes/dislikes) need delete and stuff for auth
- should probably allow review edits, dont want to add and edit at same time, use a state var, reviewIDToEdit along with a check in Review comp to see if there is an id to edit, and if it is equal to that review, then allow that review to be edited, have a put route that handles likes, dislikes, and edits

- re(factor/work):
  - use express router
  - make a default not found route
  
  - switch it to the structure that deployed version is using
  - separate react fcns from App comp, getting really messy, maybe redux? redux, watch cj convert his api app, then conver this bad boi to redux babeeee





- auth(go through with fine toothed comb to see what needs auth and what doesnt, take notes)
- flash errors
- make all bind statements inside of App constructor
- add maps to show page
- add campground and comment drafts for dif users
- figure out dif styling, css modules, styled components, css in js, material ui
- use hooks to get rid of redirect error, and make everything nicer and learn hooks
- get rid of all try catch blocks, change to 
    var variable = await thing.catch((err) => {
      handle error;
    });
    if (variable) {
      do thing;
    }
- fix multiple axios calls (double) and double renders for show and index page bc of axios calls
- Make sure apis are safe in v12 and v12_react
- look at size of defalutjumbotron
- make entire campground card clickable, not just button at the bottom
- make only able to like or dislike, not both, only do it once.



