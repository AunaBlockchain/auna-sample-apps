
Sample application written in Python based in Hyperledger Besu (Ethereum)


In order to define a python API, the following settings must be defined in 'project.yaml' file:


1. Type of image must be **'python'**
```
    runtime.type = python
```

2. Python's version has to be properly defined (>= 3.0) as follows
```
    runtime.version = 3.10
```

3. name of the API should be the name of the main file (with **.py** extension)

    In this example: internal, external

4. **'requirements.txt'** file must be located in the root of the API code
    In this example, the requirements file for the internal API is in **'apis/internal/python-besu-internal'** directory and contains:

```
flask
web3
```


Below is a sample of the definition in **'project.yaml'** file for external API:

```
 external:
    - name: "external"
      protocol: "HTTP"
      port: "8080"
      host: "0.0.0.0"
      path: "apis"
      description: "External API Python"
      runtime:
        image: ""
        type: "python"
        version: "3.8"
      env:
        - name: "variable2"
          value: "2"
      report: {}
      tasks: []
      cache: []
      mailer: {}
      metrics:
        enabled: false
        port: 8000
        endpoint: "/metrics"
      singleton: true
      security:
        enabled: false
      permissions: []
```

