**Create a new Project**
```
curl --location 'http://localhost:3000/api/projects' \
--header 'x-api-key: sXQ8vYFpo6RjtAopYshisaToSzxRnEB5' \
--header 'Content-Type: application/json' \
--data '{
    "name": "Testing",
    "tags": ["RESTful", "API"],
    "description": "Development of NodeJs API"
}'

201 Created
```

**Read all projects**
```
curl --location 'http://localhost:3000/api/projects' \
--header 'x-api-key: sXQ8vYFpo6RjtAopYshisaToSzxRnEB5'

{
    "projects": [
        {
            "uid": "0feacb21-7923-4348-97e2-105a8adb8f66",
            "name": "Testing",
            "description": "Development of NodeJs API",
            "tags": [
                "RESTful",
                "API"
            ],
            "status": "NEW",
            "createdAt": "2025-12-15T22:34:02.780Z",
            "updatedAt": null,
            "wasUpdated": false,
            "archivedAt": null,
            "wasArchived": false,
            "isStoredOnDB": true
        },
        {
            "uid": "b685dad5-4d3a-428e-9282-6e8049e5ec72",
            "name": "Development",
            "description": "Development of NodeJs API",
            "tags": [
                "Back End",
                "API"
            ],
            "status": "NEW",
            "createdAt": "2025-12-15T22:34:45.658Z",
            "updatedAt": null,
            "wasUpdated": false,
            "archivedAt": null,
            "wasArchived": false,
            "isStoredOnDB": true
        }
    ]
}
```

**Read one project**
```
curl --location 'http://localhost:3000/api/projects/0feacb21-7923-4348-97e2-105a8adb8f66' \
--header 'x-api-key: sXQ8vYFpo6RjtAopYshisaToSzxRnEB5'

{
    "project": {
        "uid": "0feacb21-7923-4348-97e2-105a8adb8f66",
        "name": "Testing",
        "description": "Development of NodeJs API",
        "tags": [
            "RESTful",
            "API"
        ],
        "status": "NEW",
        "createdAt": "2025-12-15T22:34:02.780Z",
        "updatedAt": null,
        "wasUpdated": false,
        "archivedAt": null,
        "wasArchived": false,
        "isStoredOnDB": true
    }
}
```

**Modify one project**
```
curl --location --request PATCH 'http://localhost:3000/api/projects/0feacb21-7923-4348-97e2-105a8adb8f66' \
--header 'x-api-key: sXQ8vYFpo6RjtAopYshisaToSzxRnEB5' \
--header 'Content-Type: application/json' \
--data '{
    "changes": [
        { "property": "name", "value": "OSI Model" },
        { "property": "tags", "value": ["TCP", "IP"] },
        { "property": "description", "value": "Levels 5 to 7" },
        { "property": "status", "value": "IN_PROGRESS" }
    ]
}'

204
No Content
```

**Remove one project**
```
curl --location --request DELETE 'http://localhost:3000/api/projects/0feacb21-7923-4348-97e2-105a8adb8f66' \
--header 'x-api-key: sXQ8vYFpo6RjtAopYshisaToSzxRnEB5'

200 OK
```