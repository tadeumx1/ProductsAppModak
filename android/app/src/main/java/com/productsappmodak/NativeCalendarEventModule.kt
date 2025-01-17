package com.productsappmodak

import android.app.AlertDialog
import android.content.Intent
import java.util.Calendar
import com.productsappmodak.NativeCalendarEventSpec
import com.facebook.react.bridge.ReactApplicationContext

class NativeCalendarEventModule(reactContext: ReactApplicationContext) : NativeCalendarEventSpec(reactContext) {
    override fun getName(): String {
        return NAME
    }

    override fun saveCalendarEvent(calendarEventName: String) {
        val cal = Calendar.getInstance()

        currentActivity?.let { activity ->
            val builder = AlertDialog.Builder(activity)
            builder.setTitle("Create Event")
            builder.setMessage("Do you want to create the event \"$calendarEventName\"?")
            builder.setPositiveButton("Yes") { _, _ ->
                val intent = Intent(Intent.ACTION_EDIT).apply {
                    type = "vnd.android.cursor.item/event"
                    putExtra("beginTime", cal.timeInMillis)
                    putExtra("allDay", true)
                    putExtra("rrule", "FREQ=YEARLY")
                    putExtra("endTime", cal.timeInMillis + 60 * 60 * 1000)
                    putExtra("title", calendarEventName)
                }
                activity.startActivity(intent)
            }
            builder.setNegativeButton("No") { dialog, _ ->
                dialog.dismiss()
            }
            builder.create().show()
        }
    }

    companion object {
        const val NAME = "NativeCalendarEvent"
    }
}
