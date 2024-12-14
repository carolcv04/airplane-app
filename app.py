#imports
from helper import helper
from db_operations import db_operations

#global variables
db_ops = db_operations("flights.db")

#functions
def startScreen():
    print("Welcome to Flight Booker!")
    # Uncomment to initialize tables or populate data if necessary
    # db_ops.create_flights_table()
    # db_ops.populate_flights_table("flights.csv")

def options():
    print('''Select from the following menu options: 
    1. Search Flights
    2. View Flights on Adjacent Days
    3. Book a Flight
    4. Cancel a Booking
    5. Exit''')
    return helper.get_choice([1, 2, 3, 4, 5])

def search_flights():
    departure = input("Enter the departure city: ")
    destination = input("Enter the destination city: ")
    date = input("Enter the travel date (YYYY-MM-DD): ")

    query = '''
    SELECT FlightID, Departure, Destination, Date, Time, Price 
    FROM flights 
    WHERE Departure = :departure 
    AND Destination = :destination 
    AND Date = :date;
    '''
    params = {"departure": departure, "destination": destination, "date": date}
    results = db_ops.select_query_params(query, params)

    if results:
        helper.pretty_print(results)
    else:
        print("No flights available for the selected criteria.")

def view_adjacent_days():
    base_date = input("Enter the base travel date (YYYY-MM-DD): ")
    departure = input("Enter the departure city: ")
    destination = input("Enter the destination city: ")

    query = '''
    SELECT FlightID, Departure, Destination, Date, Time, Price 
    FROM flights 
    WHERE Departure = :departure 
    AND Destination = :destination 
    AND (Date = DATE(:base_date, '-1 day') OR Date = DATE(:base_date, '+1 day'));
    '''
    params = {"departure": departure, "destination": destination, "base_date": base_date}
    results = db_ops.select_query_params(query, params)

    if results:
        helper.pretty_print(results)
    else:
        print("No flights available on adjacent days.")

def book_flight():
    flight_id = input("Enter the FlightID of the flight to book: ")
    user_choice = input("Do you have an account? (yes/no): ").strip().lower()

    if user_choice == 'yes':
        user_id = input("Enter your UserID: ")
    else:
        print("Creating a guest booking.")
        name = input("Enter your name: ")
        email = input("Enter your email: ")
        phone = input("Enter your phone number: ")

        query = '''
        INSERT INTO users (Name, Email, Phone) VALUES (:name, :email, :phone)
        RETURNING UserID;
        '''
        params = {"name": name, "email": email, "phone": phone}
        user_id = db_ops.single_record_params(query, params)

    booking_query = '''
    INSERT INTO bookings (UserID, FlightID) VALUES (:user_id, :flight_id);
    '''
    booking_params = {"user_id": user_id, "flight_id": flight_id}
    db_ops.modify_query_params(booking_query, booking_params)
    print("Flight booked successfully!")

def cancel_booking():
    booking_id = input("Enter your BookingID to cancel: ")
    query = '''
    DELETE FROM bookings 
    WHERE BookingID = :booking_id;
    '''
    db_ops.modify_query_params(query, {"booking_id": booking_id})
    print("Booking cancelled successfully!")

#main method
startScreen()

#program loop
while True:
    user_choice = options()
    if user_choice == 1:
        search_flights()
    elif user_choice == 2:
        view_adjacent_days()
    elif user_choice == 3:
        book_flight()
    elif user_choice == 4:
        cancel_booking()
    elif user_choice == 5:
        print("Goodbye!")
        break

db_ops.destructor()