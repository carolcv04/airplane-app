#imports
from helper import helper
from db_operations import db_operations


db_ops = db_operations("flights.db")

#functions
def startScreen():
    print("Welcome!")


def options():
    print('''Select from the following menu options: 
    1. Search Flights
    2. View Flights on Adjacent Days
    3. Book a Flight
    4. Cancel a Booking
    5. Exit''')
    return helper.get_choice([1, 2, 3, 4, 5])

def search_flights(departure, destination, date):
    query = '''
    SELECT FlightID, Departure, Destination, Date, Time, Price 
    FROM flights 
    WHERE Departure = :departure 
    AND Destination = :destination 
    AND Date = :date;
    '''
    params = {"departure": departure, "destination": destination, "date": date}
    results = db_ops.select_query_params(query, params)

    return results if results else "No flights available for the selected criteria."

def view_adjacent_days(base_date, departure, destination):
    query = '''
    SELECT FlightID, Departure, Destination, Date, Time, Price 
    FROM flights 
    WHERE Departure = :departure 
    AND Destination = :destination 
    AND (Date = DATE(:base_date, '-1 day') OR Date = DATE(:base_date, '+1 day'));
    '''
    params = {"departure": departure, "destination": destination, "base_date": base_date}
    results = db_ops.select_query_params(query, params)

    return results if results else "No flights available on adjacent days."

def book_flight(flight_id, user_id=None, name=None, email=None, phone=None):
    if not user_id:  # Guest booking
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
    return "Flight booked successfully!"

def cancel_booking(booking_id):
    query = '''
    DELETE FROM bookings 
    WHERE BookingID = :booking_id;
    '''
    db_ops.modify_query_params(query, {"booking_id": booking_id})
    return "Booking cancelled successfully!"

#main method
startScreen()

#program loop
while True:
    user_choice = options()
    if user_choice == 1:
        departure = input("Enter the departure city: ")
        destination = input("Enter the destination city: ")
        date = input("Enter the travel date (YYYY-MM-DD): ")
        results = search_flights(departure, destination, date)
        helper.pretty_print(results) if isinstance(results, list) else print(results)
    elif user_choice == 2:
        base_date = input("Enter the base travel date (YYYY-MM-DD): ")
        departure = input("Enter the departure city: ")
        destination = input("Enter the destination city: ")
        results = view_adjacent_days(base_date, departure, destination)
        helper.pretty_print(results) if isinstance(results, list) else print(results)
    elif user_choice == 3:
        flight_id = input("Enter the FlightID of the flight to book: ")
        user_choice = input("Do you have an account? (yes/no): ").strip().lower()
        if user_choice == 'yes':
            user_id = input("Enter your UserID: ")
            message = book_flight(flight_id, user_id=user_id)
        else:
            name = input("Enter your name: ")
            email = input("Enter your email: ")
            phone = input("Enter your phone number: ")
            message = book_flight(flight_id, name=name, email=email, phone=phone)
        print(message)
    elif user_choice == 4:
        booking_id = input("Enter your BookingID to cancel: ")
        message = cancel_booking(booking_id)
        print(message)
    elif user_choice == 5:
        print("Goodbye!")
        break

db_ops.destructor()