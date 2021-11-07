const API = {
  baseURL: "http://localhost:3001",
  sleep: (milliseconds) => {
      var start = new Date().getTime();
      for (var i = 0; i < 1e7; i++) {
          if ((new Date().getTime() - start) > milliseconds) {
              break;
          }
      }
  },
  user: {
       check: async (email) => { // returns api_key as string or false if invalid
            let url = API.baseURL + "/api/user/check";
            let body = JSON.stringify({
                'email': email,
            });
            const response = await fetch(url, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: body
            });
            let jdata = response.json();
            return jdata;
        },
      register: async (email, password) => { // returns api_key as string or false if invalid
          let url = API.baseURL + "/api/user/register";
          let body = JSON.stringify({
              'email': email,
              'password': password
          });
          const response = await fetch(url, {
              method: 'POST',
              mode: 'cors',
              cache: 'no-cache',
              credentials: 'same-origin',
              headers: {
                  'Content-Type': 'application/json'
              },
              redirect: 'follow',
              referrerPolicy: 'no-referrer',
              body: body
          });
          let jdata = response.json();
          return jdata;
      },
      login: async (email, password) => { // returns api_key as string or false if invalid api_key
          let url = API.baseURL + "/api/user/login";
          let body = JSON.stringify({
              'email': email,
              'password': password
          });
          const response = await fetch(url, {
              method: 'POST',
              mode: 'cors',
              cache: 'no-cache',
              credentials: 'same-origin',
              headers: {
                  'Content-Type': 'application/json'
              },
              redirect: 'follow',
              referrerPolicy: 'no-referrer',
              body: body
          });
          let jdata = response.json();
          return jdata;
      },
  },
  question: {
    create: async (api_key, title, description) => { // returns api_key as string or false if invalid api_key
        let url = API.baseURL + "/api/question/create";
        let body = JSON.stringify({
            'api_key': api_key,
            'title': title,
            'description': description
        });
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: body
        });
        let jdata = response.json();
        return jdata;
    },
    get: async (question_id) => { // returns api_key as string or false if invalid api_key
        let url = API.baseURL + "/api/question/get";
        let body = JSON.stringify({
            'question_id': question_id,
        });
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: body
        });
        let jdata = response.json();
        return jdata;
    },
    list: async () => { // returns api_key as string or false if invalid api_key
        let url = API.baseURL + "/api/question/list";
        const response = fetch(url);
        return (await response).json();
    },
  }
}

export default API;