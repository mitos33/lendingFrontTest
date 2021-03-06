from flask import Flask, jsonify
from flask import request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

#define endpoint
@app.route('/requestLoan', methods=['POST']) 
#This method takes the values inside the "request" object and evaluate them according to the established conditions
#returns = {response: response, status: status}
def requestLoan():
    if(request.json['tax_id'] and request.json['business_name'] and request.json['requested_amount']):
        try:
            requested_amount = int(request.json['requested_amount'])

            if requested_amount <= 0:
                response = 'The requested amount must be greater than $0'
                status = 'warning'
            elif requested_amount > 50000:
                response = 'Declined'
                status = 'error'
            elif requested_amount == 50000:
                response = 'Undecided'
                status = 'warning'
            elif requested_amount < 50000:
                response = 'Approved'
                status = 'success'

        except ValueError:   
            response = 'The requested amount must be a number, try again'
            status = 'warning'

        return jsonify(response = response, status = status)

    else:
        return jsonify(response = 'Please, fill in all the required fields.', status = 'warning')

