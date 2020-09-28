### How to setup

1. Run `pip3 install rasa==2.0.0rc2`. NOTE: This install a lot of dependencies, you may want to use virtualenv to keep your local dependencies organized

2. Run `rasa train`. This should train the Rasa Assistant, with 2 initial steps: (1) NLU model training and (2) Core model training

3. Once training is complete, you will receive a notification that specifies the directory and filename of the model that was trained:
```
Your Rasa model is trained and saved at '/Users/projects/personal/rasa-project/models/20200927-222831.tar.gz'
```
NOTE: The model name seems to have been derived from the data and time when `rasa train` was called. The initial training took 26 mins. for me as it included the download time for the base model: `https://github.com/PolyAI-LDN/polyai-models/releases/download/v1.0/model.tar.gz`

4. Rasa will ask you whether you'd like to test the trained rasa assistant on your first try.

### Succeeding Training Notes
1. I tried running traiing again after updating the `favorite_color` intent and it was able to train it in less than 3 mins.

2. Tried running again without any changes and I got:
```
Nothing changed. You can use the old model stored at '/Users/projects/personal/rasa-project/models/20200927-230117.tar.gz'.
```

### Testing Trained Rasa Assistant Model
You can run `rasa shell` to test the latest trained model.

### Automated Testing
Something very unique with RASA is the Automated Testing. Run `rasa train` to try.

### Manually Running the Rasa Server
You can manually run the rasa server by running `rasa run --enable-api`. See: https://rasa.com/docs/rasa/http-api

Rasa should give you the endpoint you should connect to, e.g.:
```
Starting Rasa server on http://localhost:5005
```

Here's the link to the API Documentation:
https://rasa.com/docs/rasa/pages/http-api


### Here's how to connect the Bot into your Own Website

https://rasa.com/docs/rasa/connectors/your-own-website/#restinput

In a nutshell, you can start conversing with the bot through:
```
http://localhost:5005/webhooks/rest/webhook
```

### Migrating from DialogFlow
* https://rasa.com/docs/rasa/migrate-from

### Finding a Model that works with Rasa

After a few debugging here and there, I encountered not being able to run `rasa train` because of a missing model that is required. Upon further research, I found out that you can download it here:
* https://github.com/PolyAI-LDN/polyai-models#convert
* [Direct Link to Model](https://github.com/PolyAI-LDN/polyai-models/releases/download/v1.0/model.tar.gz)

### Working with Docker

### Issues
* Currently having issues with this:
```
rasa.exceptions.ModelNotFound: No NLU or Core data for unpacked model at: '/var/folders/4m/6prcxkh10s71tzn6frvdy7lm0000gn/T/tmpk5ekiq3q'
```
It seems like, it's looking for `core` and `nlu` default folders which can't be found when simply running `rasa train --fixed-model-name ./models/model.tar.gz`.

### Steps To Do Again

#### LOCAL ENVIRONMENT

1. [x] Fix my local environment Python Installment
2. [x] Install RASA Open Source Locally
3. [x] Run initial training with default NLU Training Data
   - [x] Run `rasa train` to generate a model, a.k.a `model 1`
   - [x] Run another training with another data, a.k.a `model 2`
   - GOAL - generate two different models with two different training data
4. [x] Test if it works using command line
   - Run `rasa shell`
   - Chat with the bot
5. [x] Test API functionality by starting the Rasa Server
   - [x] Run `rasa run`
   - [x] Load `model 1` of the models using the API
   - [x] Test chat
   - [ ] Load `model 2`
   - [ ] Test Chat

#### DOCKERIZED ENVIRONMENT
Using the installation process for Rasa Open Source, build a dockerized environment for working with rasa.
1. [ ] Build the Dockerfile with Python as base
2. [ ] Install Rasa libraries
3. [ ] Run initial training with `rasa train` via Dockerfile
4. [ ] Set Entrypoint as `rasa`
5. [ ] Run CMD `run` - this should start the server
6. [ ] Test the trained model via API, use

### Notes
* Response when running `rasa run` without trained models
```
$ rasa run
No model found. You have three options to provide a model:
1. Configure a model server in the endpoint configuration and provide the configuration via '--endpoints'.
2. Specify a remote storage via '--remote-storage' to load the model from.
3. Train a model before running the server using `rasa train` and use '--model' to provide the model path.
For more information check https://rasa.com/docs/rasa/model-storage.
```
