# API Documentation Team C

## Standard Status Response
```
200 - OK                      ---> Call API success
201 - CREATED                 ---> Post success
400 - BAD REQUEST             ---> Error on client side
401 - UNAUTHORIZED            ---> User not authorized to the request
403 - FORBIDDEN               ---> User not allowed to access
404 - NOT FOUND               ---> Request endpoint not found
500 - INTERNAL SERVER ERROR   ---> Error on server side
502 - BAD GATEWAY             ---> Invalid response from another request
```
==============================================================


## Home Page
```
.GET
http://localhost:3000/

```
==============================================================


## GROUP: user

**list user**
```
.GET
http://localhost:3000/users/

req:

res:
200 ---> <data users>
500 ---> <err>
```


**login user**
```
.POST
http://localhost:3000/users/login

req:
{
   "username" : "<username>"
   "password" : "<password>"
}

res:
200 ---> <access_token>
400 ---> "Password is not the same."
404 ---> "User is not found."
500 ---> <err>
```


**register user**
```
.POST
http://localhost:3000/users/register

req:
{
   "username" : "<username>"
   "password" : "<password>"
   "name" : "<name>"
   "image" : "<image yang di upload>"
}

res:
201 ---> <data>
409 ---> <"Email already registered!">
500 ---> <err>
```


**profile user**
```
.GET
http://localhost:3000/users/profile/:id

req:
{
   "id" : "<id>"
}

res:
200 ---> <data>
404 ---> "User not found."
500 ---> <err>
```


**edit profile-user**
```
.PUT
http://localhost:3000/users/editprofile/:id

req:
{
   "id" : "<id>"
   "name" : "<name>"
   "image" : "<image>"
}

res:
203 ---> <data>
500 ---> <err>
```


**delete user**
```
.DELETE
http://localhost:3000/users/delete/:id

req:
{
   "id" : "<id>"
}

res:
202 ---> <data>
500 ---> <err>
```

==============================================================


## GROUP: movie

**list movies**
```
.GET
http://localhost:3000/movies/:page

req:
{
   "id" : "<id>"
}

res:
200 ---> <data>
500 ---> <err>
```


**search movies**
```
.POST
http://localhost:3000/movies/search

req:
{
   "title" : "<title>"
}

res:
200 ---> <data>
404 ---> <"title not found!">
500 ---> <err>
```


**detail movie**
```
.GET
http://localhost:3000/movies/details/:id

req:
{
   "id" : "<id>"
}

res:
200 ---> <data>
404 ---> <"Movie not Found">
500 ---> <err>
```


**add movie**
```
.POST
http://localhost:3000/movies/add

req:
{
   "title" : "<title>"
   "synopsis" : "<synopsis>"
   "genre" : "<genre>"
   "poster" : "<poster>"
   "trailer" : "<trailer>"
   "rated" : "<rated>"
   "vouteCount" : "<vouteCount>"
   "releaseDate" : "<releaseDate>"
   "language" : "<language>"
}

res:
201 ---> <movie>
500 ---> <err>
```


**delete movie**
```
.DELETE
http://localhost:3000/movies/delete/:id

req:
{
   "id" : "<id>"
}

res:
200 ---> <"Movie deleted">
500 ---> <err>
```


**edit movie**
```
.PUT
http://localhost:3000/movies/edit/:id

req:
{
   "title" : "<title>"
   "synopsis" : "<synopsis>"
   "genre" : "<genre>"
   "poster" : "<poster>"
   "trailer" : "<trailer>"
   "rated" : "<rated>"
   "vouteCount" : "<vouteCount>"
   "releaseDate" : "<releaseDate>"
   "language" : "<language>"
}

res:
200 ---> <"This Movie Updated">
500 ---> <err>
```

==============================================================


## GROUP: review

**review**
```
.GET
http://localhost:3000/review/

req:
{
   "id" : "<id>"
}

res:
200 ---> <data>
500 ---> <err>
```


**add review**
```
.POST
http://localhost:3000/review/movie/:id

req:
{
   "rating" : "<rating>"
   "comment" : "<comment>"
}

res:
201 ---> <data>
409 ---> <"Can't review this movie again!">
500 ---> <err>
```


**delete review**
```
.DELETE
http://localhost:3000/review/movie/:id

req:
{
   "id" : "<id>"
}

res:
200 ---> <"Review deleted">
500 ---> <err>
```

**edit review**
```
.PUT
http://localhost:3000/review/movie/:id

req:
{
   "userId" : "<userId>"
   "MovieId" : "<MovieId>"
   "rating" : "<rating>"
   "comment" : "<comment>"
}

res:
200 ---> <"Update done!">
200 ---> <"Update not done!"> (jika update belum diterima)
500 ---> <err>
```

==============================================================