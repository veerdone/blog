package io.github.yu.blog.model;

import lombok.Data;

@Data
public class IpResult {
    private Integer status;
    private String message;
    private String request_id;
    private Result result;

    @Data
    public static class Result {
        private String ip;
        private Location location;
        private AdInfo ad_info;
    }

    @Data
    public static class Location {
        private String lat;
        private String lng;
    }

    @Data
    public static class AdInfo {
        private String nation;
        private String province;
        private String city;
        private String district;
        private Integer adcode;

        @Override
        public String toString() {
            return nation + "-" + province + "-" + city;
        }
    }
}
