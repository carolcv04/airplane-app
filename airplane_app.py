#imports
from helper import helper
from db_operations import db_operations
from datetime import datetime
from datetime import date

db_ops = db_operations("Airplane")


def startScreen():
    
    db_ops.create_plane_table()
    db_ops.populate_plane_table("C:/Users/Thoma/OneDrive/Desktop/Airplane App/airplane-app/plane.csv")

    db_ops.create_flight_table()
    db_ops.populate_flight_table("C:/Users/Thoma/OneDrive/Desktop/Airplane App/airplane-app/flight.csv")

    db_ops.create_customer_table()
    db_ops.populate_customer_table("C:/Users/Thoma/OneDrive/Desktop/Airplane App/airplane-app/customer.csv")

    db_ops.create_seat_table()
    db_ops.populate_seat_table("C:/Users/Thoma/OneDrive/Desktop/Airplane App/airplane-app/seat.csv")

    db_ops.create_ticket_table()
    db_ops.populate_ticket_table("C:/Users/Thoma/OneDrive/Desktop/Airplane App/airplane-app/ticket.csv")

    db_ops.create_payment_option_table()
    db_ops.populate_payment_option_table("C:/Users/Thoma/OneDrive/Desktop/Airplane App/airplane-app/payment_option.csv")


# Run the program
if __name__ == "__main__":
    startScreen()