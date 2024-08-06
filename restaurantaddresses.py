import pandas as pd
import requests
import os

api_key = os.getenv('GOOGLE_API_KEY')
print("Current Working Directory:", os.getcwd())

def get_address(restaurant_name, zip_code, api_key):
    # Adding 'NYC' and 'address' to the query
    query = f"{restaurant_name} address, {zip_code}, NYC"
    url = f"https://maps.googleapis.com/maps/api/geocode/json?address={requests.utils.quote(query)}&key={api_key}"
    response = requests.get(url)
    data = response.json()
    if data['status'] == 'OK':
        return data['results'][0]['formatted_address']
    else:
        print(f"Geocoding failed for: {restaurant_name} with status: {data['status']}")
        return None

# Load CSV data
df = pd.read_csv('/Users/madelynweber/Code/Sales Territories/SignedLive.csv')

# Apply the updated function to each row
df['Address'] = df.apply(lambda row: get_address(row['Company name'], row['Postal Code'], api_key), axis=1)

# Save the updated DataFrame to a new CSV file
df.to_csv('/Users/madelynweber/Code/Sales Territories/SignedLive_updated.csv', index=False)
