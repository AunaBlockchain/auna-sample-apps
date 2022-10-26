import yaml

with open("./config/config.yaml", "r") as yamlfile:
    config = yaml.load(yamlfile, Loader=yaml.FullLoader)

headers = {'Content-type': 'application/json'}

apiInternalHost = config['apiInternalHost']
apiInternalPort = config['apiInternalPort']