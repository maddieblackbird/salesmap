import pandas as pd
import requests
import os
api_key = os.getenv('GOOGLE_API_KEY')
print("Current Working Directory:", os.getcwd())

def get_address(restaurant_name, zip_code, api_key):
    url = f"https://maps.googleapis.com/maps/api/geocode/json?address={restaurant_name}+{zip_code}&key={api_key}"
    response = requests.get(url)
    data = response.json()
    if data['status'] == 'OK':
        return data['results'][0]['formatted_address']
    else:
        print(f"Geocoding failed for: {restaurant_name} with status: {data['status']}")
        return None

# Load CSV data
df = pd.read_csv('/Users/madelynweber/Code/Sales Territories/Colinterritories.csv')

# Replace 'RestaurantName' and 'ZipCode' with your actual column names
df['Address'] = df.apply(lambda row: get_address(row['Company Name'], row['Zip Code'], api_key), axis=1)

# Save the updated DataFrame to a new CSV file
df.to_csv('/Users/madelynweber/Code/Sales Territories/Colinterritories_updated.csv', index=False)
