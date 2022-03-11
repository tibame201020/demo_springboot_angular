package com.demo.back_end_springboot.back_end_springboot.domain;

import org.apache.commons.lang3.StringUtils;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

public class CodeParam {
    private String code;
    private LocalDate beginDate;
    private LocalDate endDate;
    private DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");
    private Long beginDateMilli;
    private Long endDateMilli;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getBeginDate() {
        return this.beginDate.format(formatter);
    }

    public void setBeginDate(String beginDate) {
        Instant instant = Instant.parse(beginDate);
        this.beginDateMilli = instant.toEpochMilli()/1000;
        LocalDateTime localDateTime = LocalDateTime.ofInstant(instant, ZoneId.systemDefault());
        this.beginDate = localDateTime.toLocalDate();
    }

    public String getEndDate() {
        return this.endDate.format(formatter);
    }

    public void setEndDate(String endDate) {
        LocalDateTime localDateTime;
        Instant instant;
        if (StringUtils.isBlank(endDate)) {
            instant = Instant.parse(endDate).minus(30, ChronoUnit.DAYS);
        } else {
            instant = Instant.parse(endDate);
        }
        this.endDateMilli = instant.toEpochMilli()/1000;
        localDateTime = LocalDateTime.ofInstant(instant, ZoneId.systemDefault());
        this.endDate = localDateTime.toLocalDate();
    }

    public LocalDate getBeginLocalDate() {
        return this.beginDate;
    }

    public LocalDate getEndLocalDate() {
        return this.endDate;
    }

    public Long getBeginDateMilli() {
        return beginDateMilli;
    }

    public Long getEndDateMilli() {
        return endDateMilli;
    }

    public void setBeginLocalDate(LocalDate date) {
        this.beginDate = date;
    }

}
