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
* Issue with training model for the first time (./models don't have any model content). For some reason, rasa is not able to store models in the `./models` folder despite having to successfully train. This doesn't happen when the `./models` folder already contains a model to start.
  * We might need to train a model and have the stored indefinitely in our `./models` folder as our base?

* [RESOLVED] Currently having issues with this:
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
1. [x] Build the Dockerfile with Python as base
2. [x] Install Rasa libraries
3. [ ] Run initial training with `rasa train` via Dockerfile
4. [x] Set Entrypoint as `rasa`
5. [ ] Run CMD `['run', '--enable-api']` - this should start the server
6. [ ] Test initially trained model
7. [ ] Question: Do I need to have an initially trained model as my base? or is it okay to always start from scratch using `rasa train`? :thinking:
7. [ ] Test training via API - train 2 - 3 different models
8. [ ] Test load/unloading of models
9. [ ] Question: Is it possible to create different sets of testing materials?

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

* Running with `rasa run` with already trained model logs:
```
Step 11/14 : RUN echo -e "no\n" | rasa train
 ---> Running in fa8a1582ed4d
2020-09-30 07:48:47 WARNING  rasa.shared.utils.validation  - Training data file data/rules.yml doesn't have a 'version' key. Rasa Open Source will read the file as a version '2.0' file. See https://rasa.com/docs/rasa.
Nothing changed. You can use the old model stored at '/usr/src/app/models/20200929-141249.tar.gz'.
```

* Rasa will always load the server with the latest trained model upon running `docker-compose up`.

  * I attempted to remove the last model and re-run `docker-compose` and found out that it ran training again. This means that rasa **probably** keeps track of the last trained model somewhere in cache or some file.

* If you delete the models stored in folder `./models`, while a model is already loaded, it doesn't affect the Rasa Server.

* If no model was loaded, you will get something like this:
```
{
    "config": {
        "store_entities_as_slots": true
    },
    "session_config": {
        "session_expiration_time": 0,
        "carry_over_slots_to_new_session": true
    },
    "intents": [],
    "entities": [],
    "slots": {},
    "responses": {},
    "actions": [],
    "forms": {},
    "e2e_actions": []
}
```

* Can we run model training via API without a previously trained model? **Answer: ** Yes.

* Can we run `rasa run` without an available `pre-trained` model? **Answer:** Yes.
