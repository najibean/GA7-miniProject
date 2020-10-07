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
http://localhost:3000/

```
==============================================================


## GROUP: user

**list user**
```
http://localhost:3000/users/

req:

res:
200 ---> <data users>
500 ---> <err>
```


**login user**
```
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
500 ---> <err>
```


**profile user**
```
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

**list movie**
```
http://localhost:3000/movies/

req:
{
   "id" : "<id>"
}

res:
200 ---> <data>
500 ---> <err>
```


**detail movie**
```
http://localhost:3000/movies/details/:id

req:
{
   "id" : "<id>"
}

res:
200 ---> <data>
404 ---> <"User not Found">
500 ---> <err>
```


**add movie**
```
http://localhost:3000/movies/add

req:
{
   "id" : "<id>"
}

res:
200 ---> <"Movie deleted">
500 ---> <err>
```


**delete movie**
```
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
http://localhost:3000/movies/edit/:id

req:
{
   "id" : "<id>"
}

res:
200 ---> <"This Movie Updated">
500 ---> <err>
```

==============================================================