# API Documentation Team C

## Standard Status Response
200 - OK                      ---> Call API success
201 - CREATED                 ---> Post success
400 - BAD REQUEST             ---> Error on client side
401 - UNAUTHORIZED            ---> User not authorized to the request
403 - FORBIDDEN               ---> User not allowed to access
404 - NOT FOUND               ---> Request endpoint not found
500 - INTERNAL SERVER ERROR   ---> Error on server side
502 - BAD GATEWAY             ---> Invalid response from another request


FORMAT:
{root.api}/{version}/{grouping}/{endpoint}

CONTOH:
http://localhost:3000/v1/users/

==============================================================


### GROUP: Home Page
http://localhost:3000/
[1] - menampilkan preview movie hingga 10 movie per-halaman
[2] - _silahkan ditambahkan accessories lainnya_

==============================================================


### GROUP: user's login
http://localhost:3000/users/login
[1] - menampilkan form login user

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

[2] - menampilkan pilihan untuk masuk ke halaman register
[3] - _silahkan ditambahkan accessories lainnya_

==============================================================


### GROUP: user's register
http://localhost:3000/users/register
[1] - menampilkan form register user

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

[2] - jika sudah berhasil register, kembali ke halaman login
[3] - _silahkan ditambahkan accessories lainnya_

==============================================================


### GROUP: user's profie
http://localhost:3000/users/profile/:id
[1] - menampilkan profile dari user

req:
{
   "id" : "<id>"
}

res:
200 ---> <data>
404 ---> "User not found."
500 ---> <err>

[2] - _silahkan ditambahkan accessories lainnya_

==============================================================


### GROUP: edit user's profie
http://localhost:3000/users/editprofile/:id
[1] - menampilkan profile dari user

req:
{
   "id" : "<id>"
   "name" : "<name>"
   "image" : "<image>"
}

res:
203 ---> <data>
500 ---> <err>

[2] - _silahkan ditambahkan accessories lainnya_

==============================================================


### GROUP: delete user's profie
http://localhost:3000/users/delete/:id
[1] - menampilkan profile dari user

req:
{
   "id" : "<id>"
}

res:
202 ---> <data>
500 ---> <err>

[2] - _silahkan ditambahkan accessories lainnya_

==============================================================
