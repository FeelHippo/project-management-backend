## Project Management Backend

This NodeJs application handles CRUD operations for the Project Management Frontend.

See Swagger Documentation [here](http://project-management-backend-env.eba-srcjwhmq.eu-west-1.elasticbeanstalk.com/api-docs/).
So as to test the URIs through Swagger, please request the API key to me.

### Authentication

API key authentication is a type of authentication that uses long-lived access tokens embedded directly into an application to authenticate requests to access secure ArcGIS services and items.
Verification of that token is delegated to a dedicated middleware, that reads the `x-api-key` header received from the client. 

### Data Validation

The OpenAPI Specification (OAS) defines a standard, language-agnostic interface to HTTP APIs which allows both humans and computers to discover and understand the capabilities of the service without access to source code, documentation, or through network traffic inspection. When properly defined, a consumer can understand and interact with the remote service with a minimal amount of implementation logic.

An OpenAPI Description can then be used by documentation generation tools to display the API, code generation tools to generate servers and clients in various programming languages, testing tools, and many other use cases.

See more details [here](https://swagger.io/specification/).

### Storage

This application stores its data in a [PostgreSQL](https://www.postgresql.org/) database, hosted on AWS RDS. More details on that below.

Drizzle (Kit) is used to handle the migration generation process. 

Please request the database authentication credentials to me if you'd like to connect to the database instance directly.

### Deployment

The database is hosted on an [Aurora and RDS](https://eu-west-1.console.aws.amazon.com/rds/home?region=eu-west-1#database:id=database-project-manager;is-cluster=true) instance.

CI/CD is achieved with an instance of [CodePipeline](https://eu-west-1.console.aws.amazon.com/codesuite/codepipeline/pipelines/coding-challenge-backend/view?region=eu-west-1&stage=Deploy&tab=visualization)

Deployment is made to an [Elastic Beanstalk](https://eu-west-1.console.aws.amazon.com/elasticbeanstalk/home?region=eu-west-1#/environment/dashboard?environmentId=e-hzqckxqmyt) environment.

The IAM [Role](https://us-east-1.console.aws.amazon.com/iam/home#/roles/details/AWSCodePipelineServiceRole-eu-west-1-coding-challenge-backend?section=permissions) is in charge of granting access to the [EC2](https://eu-west-1.console.aws.amazon.com/ec2/home?region=eu-west-1#InstanceDetails:instanceId=i-0ed1ec337578d8a26) instance that serves the application

### Architecture and Code Design

The application is loosely modelled on the Repository Pattern.

The [role of the repository](https://github.com/FeelHippo/conversational_commerce/tree/main/inversion_of_control) is to abstract data sources.
The data source in this case, is a PostgreSQL database.

The *Repository Layer* centralizes the query construction code, providing a more object-oriented way of communicating with a collection of objects.

The *data mapper pattern*, in contrast to the active record pattern, ensures domain objects only contain business rules.
Any task related to database operations is handed over to the data mapper layer.

The ORM used in this project is Drizzle, which does not allow to generate types directly from the DB schema, as is the case with [Prisma](https://www.prisma.io/typescript).

Each route is assigned a dedicated Controller, which is in charge of CRUD operations on the Resources. 

Good OOP is implemented throughout the project, as well as Dependency Injection. 

### Example CURLs
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