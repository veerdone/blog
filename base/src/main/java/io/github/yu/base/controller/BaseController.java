package io.github.yu.base.controller;

import io.github.yu.base.service.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public class BaseController<T, Q extends T, S extends BaseService<T, Q>> {
    @Autowired
    private S service;

    @PostMapping("/insert")
    public void insert(@RequestBody T t) {
        this.service.insert(t);
    }

    @DeleteMapping("/deleteById/{id}")
    public void deleteById(@PathVariable Long id) {
        this.service.deleteById(id);
    }

    @PutMapping("/updateById")
    public void updateById(@RequestBody T t) {
        this.service.updateById(t);
    }

    @GetMapping("/getById/{id}")
    public T getById(@PathVariable Long id) {
        return this.service.getById(id);
    }

    @GetMapping("/getGyName")
    public T getByName(@RequestParam("name") String username) {
        return this.service.getByName(username);
    }

    @GetMapping("/list")
    public List<T> list() {
        return this.service.list();
    }

    @GetMapping("/pageList")
    public List<T> pageList() {
        return this.service.pageList();
    }

    @PostMapping("/pageListByQuery")
    public List<T> pageListByQuery(@RequestBody Q query) {
        return this.service.pageListByQuery(query);
    }

}
