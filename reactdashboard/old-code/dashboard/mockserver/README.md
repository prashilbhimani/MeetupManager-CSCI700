The API used to mock data is found here:
https://www.npmjs.com/package/mockserver

To start the mock server we need to run:
mockserver -p 8080 -m <path to mocks>
For example in my case I ran from the mockerserver folder:
mockserver -p 8080 -m .

Now in the browser if I do
http://localhost:8080/mocks
It performs a GET request to the mocks folder and returns the JSON in the GET.mock file.

The path is based on the folder structure.
Also, the file returned is based on the method that we specify. So since we did a GET, GET.mock is returned.

If you try a path that is not mocked, the browser shows "not mocked"