<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->increments('id');
            $table->string('code', 50);
            $table->string('name');
            $table->tinyInteger('type');
            $table->string('model');
            $table->integer('time_order');
            $table->string('min_quantity');
            $table->integer('maker_id');
            $table->integer('vendor_id');
            $table->string('price');
            $table->string('base_price');
            $table->string('unit', 50);
            $table->string('barcode', 50);
            $table->text('note');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('items');
    }
}
