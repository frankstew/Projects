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


- add edit campground route, use defaultValue not value to fix read only input issue. Need to fix the rerendering of the show page after update, unless I do an ugly fix to getCampgroundShowData to force it to update, the setState call gets skipped so the changes dont show on the rerender bc of the conditional stuff in getCampgroundShowData to prevent infinite looping, gotta be a way around it
- add comment routes
- add image preview to edit show page
- make all bind statements inside of App constructor


- make handleChange one fcn for edit and add
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


